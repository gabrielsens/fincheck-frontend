import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { authService } from "../../../app/service/authService";
import { useAuth } from "../../../app/hooks/useAuth";

const schema = z.object({
  email: z.string().nonempty('Email é obrigatório').email('Informe um email válido'),
  password: z.string().nonempty('Senha é obrigatória').min(8, 'Senha deve conter pelo menos 8 dígitos')
});

type FormData = z.infer<typeof schema>;

export default function useLoginController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { signin } = useAuth();

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: authService.signin
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      signin(accessToken);
    } catch {
      toast.error('Credenciais inválidas');
    }
  })

  return {
    register,
    handleSubmit,
    errors,
    isLoading
  };
}
