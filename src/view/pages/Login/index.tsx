import { Link } from "react-router-dom";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export function Login() {
  return (
    <div>
    <header className="flex flex-col items-center gap-4 text-center">
      <h1 className="text-2xl font-bold text-gray-900">
        Entre em sua conta
      </h1>

      <p className="space-x-2">
        <span className="tracking-[-0.5px]">Novo por aqui</span>
        <Link to="/register" className="tracking-[-1px] font-medium text-teal-900">Crie uma conta</Link>
      </p>
    </header>

    <form className="mt-[60px] flex flex-col gap-4">
      <Input type="email" name="email" placeholder="Email" />
      <Input type="password" name="password" placeholder="Senha" />
      <Button type="submit" className="mt-2">
        Entrar
      </Button>
    </form>
  </div>
  )
}
