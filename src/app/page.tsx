"use client";

import Image from "next/image";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import LoginForm from "./authentication/components/login-form";
import SignUpForm from "./authentication/components/sign-up-form";

export default function HomePage() {
  return (
    <div className="flex h-svh flex-col self-stretch p-4">
      <div className="absolute top-0 right-0 bottom-1/2 left-0 -z-1 bg-sky-500"></div>
      {/* Logo */}
      <div className="">
        <Image
          src="/logo_cplus_white.png"
          alt="Clinica Plus"
          width={130}
          height={28}
        />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center">
        {/* Login */}
        <div className="">
          <Tabs defaultValue="login" className="w-[350px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Criar conta</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <SignUpForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
