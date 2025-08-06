"use client";

import NotificationDialog from "@/components/NotificationDialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth/useAuth";
import { passwordValidations } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeClosed, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email("Debe ser un correo electrónico válido"),
  password: z
    .string()
    .min(8, "Contraseña debe tener al menos 8 caracteres")
    .refine((val) => /[A-Z]/.test(val), {
      message: "Contraseña debe contener al menos una letra mayúscula",
    })
    .refine((val) => /[a-z]/.test(val), {
      message: "Contraseña debe contener al menos una letra minúscula",
    })
    .refine((val) => /[^a-zA-Z0-9]/.test(val), {
      message: "Contraseña debe contener al menos un carácter especial",
    })
    .refine(
      (val: string) => {
        const digits = val.replace(/\D/g, "");
        for (let i = 0; i < digits.length - 2; i++) {
          const n1 = parseInt(digits[i]);
          const n2 = parseInt(digits[i + 1]);
          const n3 = parseInt(digits[i + 2]);
          if (n2 === n1 + 1 && n3 === n2 + 1) {
            return false; // hay tres consecutivos
          }
        }
        return true;
      },
      {
        message: "Contraseña no debe contener números consecutivos",
      }
    )
    .refine(
      (val: string) => {
        const letters = val.toLowerCase().replace(/[^a-z]/g, "");
        for (let i = 0; i < letters.length - 2; i++) {
          const c1 = letters.charCodeAt(i);
          const c2 = letters.charCodeAt(i + 1);
          const c3 = letters.charCodeAt(i + 2);
          if (c2 === c1 + 1 && c3 === c2 + 1) {
            return false; // hay tres consecutivas
          }
        }
        return true;
      },
      {
        message: "Contraseña no debe contener letras consecutivas (ej: abc)",
      }
    ),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState({
    title: "",
    description: "",
    type: "info" as "success" | "error" | "warning" | "info",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login } = useAuth();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return await login(formData);
    },
    onSuccess: () => {
      form.reset();
      setDialogProps({
        title: "Éxito",
        description: "Has iniciado sesión correctamente.",
        type: "success",
      });
      setIsOpen(true);
    },
    onError: (error) => {
      console.error("Error al iniciar sesión:", error.name);
      setDialogProps({
        title: "Error al iniciar sesión",
        description: error.message,
        type: "error",
      });
      setIsOpen(true);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();

    formData.append("email", values.email);
    formData.append("password", values.password);

    loginMutation.mutate(formData);
  }

  function handleShowPassword() {
    setShowPassword((val) => !val);
  }

  return (
    <Card className="w-full max-w-sm mx-auto mt-10">
      <CardHeader>
        <CardTitle>Iniciar sesión</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            id="register-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        form.trigger("email");
                      }}
                      onBlur={() => form.trigger("email")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          form.trigger("password");
                        }}
                        onBlur={() => form.trigger("password")}
                      />
                      <button
                        type="button"
                        onClick={handleShowPassword}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                      >
                        {showPassword ? (
                          <EyeClosed size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <ul className="text-xs list-disc ml-5">
                    {passwordValidations.map((v, i) => (
                      <li
                        key={i}
                        className={
                          v.check(field.value)
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {v.message}
                      </li>
                    ))}
                  </ul>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          form="register-form"
          className="w-full"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? (
            <>
              <Loader2Icon className="animate-spin" />
              Ingresando...
            </>
          ) : (
            "Ingresar"
          )}
        </Button>
      </CardFooter>
      <NotificationDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={dialogProps.title}
        description={dialogProps.description}
        type={dialogProps.type}
        onClose={() => {
          router.push("/");
        }}
      />
    </Card>
  );
}

export default Login;
