import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export function Register() {
  return (
    <>
    <header className="flex flex-col items-center gap-4 text-center">
      <h1 className="text-2xl font-bold text-gray-900">
        Crie sua conta
      </h1>

      <p className="space-x-2">
        <span className="tracking-[-0.5px]">Já possui uma conta?</span>
        <Link to="/register" className="tracking-[-1px] font-medium text-teal-900">
          Fazer login
        </Link>
      </p>
    </header>

    <form className="mt-[60px] flex flex-col gap-4">
      <Input name="name" placeholder="Nome" />
      <Input type="email" name="email" placeholder="Email" />
      <Input type="password" name="password" placeholder="Senha" />
      <Button type="submit" className="mt-2">
        Criar conta
      </Button>
    </form>
  </>
  )
}
