import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({
     id: "NewBank",
     name: "NewBank",
    retryFunction: async (attempt) => ({
    delay: Math.pow(2, attempt) * 1000, // Exponential backoff
    maxAttempts: 2,
  }),
 });
