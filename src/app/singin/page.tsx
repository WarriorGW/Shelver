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
import { useEffect } from "react";
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

  // const testData = {
  //   username: "fernando",
  //   password: "1234",
  //   confirmPassword: "1234",
  // };
  // useEffect(() => {
  //   try {
  //     formSchema.parse(testData);
  //     console.log("Test data is valid");
  //   } catch (e) {
  //     console.log(e.issues);
  //   }
  // });

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
              {/* <FormMessage /> */}
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
