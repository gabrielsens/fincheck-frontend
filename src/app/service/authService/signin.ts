import { httpClient } from "../httpClient";

interface SigninParams {
  email: string
  password: string
}

interface signinResponse { accessToken: string}

export async function signin(body: SigninParams) {
  const { data } = await httpClient.post<signinResponse>('auth/signin', body);

  return data;
}
