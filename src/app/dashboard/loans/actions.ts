"use server";

import db from "@/db";

export async function getLoans() {
  const loans = await db.loan.findMany({ orderBy: { createdAt: "desc" } });
  return loans;
}
