"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
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
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas deben coincidir",
  });

function SignIn() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted:", values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    form.trigger("username");
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar contraseña</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Guardar</Button>
      </form>
    </Form>
  );
}

export default SignIn;
