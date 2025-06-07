"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const passwordValidations = [
  {
    message: "Al menos 8 caracteres",
    check: (val: string) => val.length >= 8,
  },
  {
    message: "Al menos una letra mayúscula",
    check: (val: string) => /[A-Z]/.test(val),
  },
  {
    message: "Al menos una letra minúscula",
    check: (val: string) => /[a-z]/.test(val),
  },
  {
    message: "Al menos un carácter especial",
    check: (val: string) => /[^a-zA-Z0-9]/.test(val),
  },
  {
    message: "Sin números consecutivos",
    check: (val: string) => !/(?:\d)(?=\d)/.test(val),
  },
  {
    message: "Sin letras consecutivas (ej: abc)",
    check: (val: string) => {
      const lower = val.toLowerCase();
      for (let i = 0; i < lower.length - 1; i++) {
        const curr = lower.charCodeAt(i);
        const next = lower.charCodeAt(i + 1);
        if (/[a-z]/.test(lower[i]) && next === curr + 1) return false;
      }
      return true;
    },
  },
];

const formSchema = z.object({
  username: z
    .string()
    .min(5, "Nombre de usuario debe tener al menos 5 caracteres"),
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
    .refine((val) => !/(?:\d)(?=\d)/.test(val), {
      message: "Contraseña no debe contener números consecutivos",
    })
    .refine(
      (val) => {
        const lower = val.toLowerCase();
        for (let i = 0; i < lower.length - 1; i++) {
          const curr = lower.charCodeAt(i);
          const next = lower.charCodeAt(i + 1);
          if (
            /[a-z]/.test(lower[i]) &&
            /[a-z]/.test(lower[i + 1]) &&
            next === curr + 1
          ) {
            return false;
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted:", values);
  }
  return (
    <Card className="w-full max-w-sm mx-auto mt-10">
      <CardHeader>
        <CardTitle>Registrarse</CardTitle>
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de usuario</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        form.trigger("username");
                      }}
                      onBlur={() => form.trigger("username")}
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
                    <Input
                      type="password"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        form.trigger("password");
                      }}
                      onBlur={() => form.trigger("password")}
                    />
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
        <Button type="submit" form="register-form" className="w-full">
          Ingresar
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Login;
