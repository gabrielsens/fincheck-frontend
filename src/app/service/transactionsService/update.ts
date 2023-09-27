import { httpClient } from "../httpClient";

interface UpdateTransactionParams {
  id: string
  bankAccountId: string
  categoryId: string
  name: string
  value: number
  date: string
  type: 'INCOME' | 'EXPENSE'
}

export async function update({ id, ...body }: UpdateTransactionParams) {
  const { data } = await httpClient.put('/transactions/' + id, body);

  return data;
}
