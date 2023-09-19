import { httpClient } from "../httpClient";

interface CreateBankAccountParams {
  name: string
  initialBalance: number
  color: string
  type: 'CHECKING' | 'INVESTMENT' | 'CASH'
}

export async function create(body: CreateBankAccountParams) {
  const { data } = await httpClient.post('/bank-accounts', body);

  return data;
}
