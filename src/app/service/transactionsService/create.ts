import { httpClient } from "../httpClient";

interface CreateTransactionParams {
  bankAccountId: string
  categoryId: string
  name: string
  value: number
  date: string
  type: 'INCOME' | 'EXPENSE'
}

export async function create(body: CreateTransactionParams) {
  const { data } = await httpClient.post('/transactions', body);

  return data;
}
