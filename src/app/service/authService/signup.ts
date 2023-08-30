import { httpClient } from "../httpClient";

interface SignupParams {
  name: string
  email: string
  password: string
}

interface signupResponse { accessToken: string}

export async function signup(body: SignupParams) {
  const { data } = await httpClient.post<signupResponse>('auth/signup', body);

  return data;
}
