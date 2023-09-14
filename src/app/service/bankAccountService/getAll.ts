import { BankAccount } from "../../entities/BankAccount";
import { httpClient } from "../httpClient";

export async function getAll() {
  const { data } = await httpClient.get<BankAccount[]>('/bank-accounts');

  return data;
}
