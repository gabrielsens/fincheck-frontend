import { Transaction } from "../../entities/Transaction";
import { httpClient } from "../httpClient";

export type TransactionFilters = {
  month: number;
  year: number;
  bankAccountId?: string;
  type?: Transaction['type'];
}

export async function getAll(filters: TransactionFilters) {
  const { data } = await httpClient.get<Transaction[]>('/transactions', {
    params: filters
  });

  return data;
}
