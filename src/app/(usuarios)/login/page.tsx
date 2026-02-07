"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "../../actions/zod";
import { loginUserAction } from "../../actions/actions";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Lock, LogIn } from "lucide-react";
import { useState } from "react";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setError(null);
    const result = await loginUserAction(values);

    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-none border-none bg-transparent">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">
            Bienvenido
          </CardTitle>
          <CardDescription>
            Ingresa tus datos para acceder a tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* CAMPO EMAIL */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs font-bold uppercase text-muted-foreground ml-1">
                      Email
                    </FormLabel>
                    <div className="flex items-center w-full border-b border-slate-300 focus-within:border-primary transition-all px-1">
                      <Mail className="h-4 w-4 text-slate-400" />
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="correo@ejemplo.com"
                          {...field}
                          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent h-12 text-base"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* CAMPO PASSWORD */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs font-bold uppercase text-muted-foreground ml-1">
                      Contraseña
                    </FormLabel>
                    <div className="flex items-center w-full border-b border-slate-300 focus-within:border-primary transition-all px-1">
                      <Lock className="h-4 w-4 text-slate-400" />
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent h-12 text-base"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && (
                <div className="bg-destructive/10 p-3 rounded-md text-destructive text-sm font-medium">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 font-bold text-lg rounded-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Entrando..." : "Iniciar Sesión"}
                <LogIn className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </Form>

          <div className="mt-8 text-center text-sm">
            <span className="text-muted-foreground">
              ¿Aún no tienes cuenta?{" "}
            </span>
            <a
              href="/register"
              className="text-primary font-bold hover:underline"
            >
              Regístrate
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
