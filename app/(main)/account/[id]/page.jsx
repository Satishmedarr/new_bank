"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import { getAccountWithTransactions } from "@/actions/accounts";
import { BarLoader } from "react-spinners";
import AccountChart from "../_components/account-chart";
import TransactionTable from "../_components/transaction-table";

export default function AccountPage() {
  const params = useParams(); // Get dynamic route params
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) return;

    async function fetchData() {
      setLoading(true);
      try {
        const data = await getAccountWithTransactions(params.id);
        if (data) {
          setAccountData(data);
        }
      } catch (error) {
        console.error("Failed to fetch account data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <BarLoader color="#9333ea" />
      </div>
    );
  }

  if (!accountData) {
    return <p className="text-center text-red-500 mt-10">Account not found.</p>;
  }

  const { transactions, ...account } = accountData;

  return (
    <div className="space-y-8 px-5">
      <div className="flex gap-4 items-end justify-between">
        <div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight gradient-title capitalize">
            {account.name}
          </h1>
          <p className="text-muted-foreground">
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()}{" "}
            Account
          </p>
        </div>

        <div className="text-right pb-2">
          <div className="text-xl sm:text-2xl font-bold">
            ${parseFloat(account.balance).toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground">
            {account._count.transactions} Transactions
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}>
        <AccountChart transactions={transactions} />
      </Suspense>

      {/* Transactions Table */}
      <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}>
        <TransactionTable transactions={transactions} />
      </Suspense>
    </div>
  );
}
