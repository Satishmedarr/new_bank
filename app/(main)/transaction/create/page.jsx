"use client";  // Add this to make it a Client Component

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import { getTransaction } from "@/actions/transaction";
import AddTransactionForm from "../_components/transaction-form";

export default function AddTransactionPage() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");  // Use .get() for searchParams in Client Components

  const [accounts, setAccounts] = useState([]);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const userAccounts = await getUserAccounts();
      setAccounts(userAccounts);

      if (editId) {
        const transaction = await getTransaction(editId);
        setInitialData(transaction);
      }
    }
    fetchData();
  }, [editId]);

  return (
    <div className="max-w-3xl mx-auto px-5">
      <div className="flex justify-center md:justify-normal mb-8">
        <h1 className="text-5xl gradient-title">Edit Transaction</h1>
      </div>
      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
    </div>
  );
}
