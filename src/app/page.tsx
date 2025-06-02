"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

import LoginForm from "./authentication/components/login-form";

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  async function onSubmit() {
    try {
      setIsLoading(true);
      await authClient.signIn.email(
        {
          email: "usuario@usuario.com.br",
          password: "usuario12345",
        },
        {
          onSuccess: () => {
            router.push("/dashboard");
          },
          onError: () => {
            toast.error("E-mail ou senha inválidos.");
          },
        },
      );
    } catch {
      toast.error("E-mail ou senha inválidos.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-screen w-screen flex-row items-center justify-center">
      {/* Logo */}
      <div className="flex h-screen flex-3 flex-col items-start justify-start bg-sky-500 px-4">
        <div className="flex flex-1 items-start justify-center p-8">
          <Image
            src="/logo_cplus_white.png"
            alt="Clinica Plus"
            width={236}
            height={28}
          />
        </div>
        <div className="mt-10 flex w-full flex-2 items-start justify-center">
          <div className="flex max-w-md flex-col gap-8">
            <h1 className="text-left text-4xl font-bold text-white">
              Desbloqueie todo o potencial da sua clínica
            </h1>
            <div>
              <p className="text-left font-bold text-white">
                Teste nossa versão de demonstração
              </p>
              <Button variant={"outline"} className="mt-4" onClick={onSubmit}>
                {isLoading && <Loader2 className="mr-0 h-4 w-4 animate-spin" />}
                Versão de demonstração
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Login */}
      <div className="flex flex-2 items-center justify-center px-4">
        <LoginForm />
      </div>
    </div>
  );
}
