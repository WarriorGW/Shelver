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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerUser } from "./actions";

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

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const result = await registerUser(formData);
      return result;
    },
    onSuccess: () => {
      form.reset();
      setIsOpen(true);
    },
    onError: (error: Error) => {
      console.error("Error al registrar usuario:", error.message);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted:", values);
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    mutation.mutate(formData);
  }

  function handleShowPassword() {
    setShowPassword((val) => !val);
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
                        tabIndex={-1}
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                      <button
                        type="button"
                        tabIndex={-1}
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="register-form" className="w-full">
          {mutation.isPending ? "Registrando..." : "Registrarse"}
        </Button>
      </CardFooter>
      <RegisterDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </Card>
  );
}

function RegisterDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registro exitoso</DialogTitle>
          <DialogDescription>
            Tu cuenta ha sido creada exitosamente. Ahora puedes iniciar sesión
            con tu nombre de usuario y contraseña.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Cerrar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Register;
