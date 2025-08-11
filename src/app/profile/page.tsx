"use client";

import NotificationDialog from "@/components/NotificationDialog";
import Terms from "@/components/Terms";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth/useAuth";
import { getAvatarUrl } from "@/lib/getAvatarUrl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ExternalLink, Loader2Icon, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { deleteUser, editUsername } from "./actions";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre es muy corto")
    .max(50, "El nombre es muy largo"),
  email: z.string().email(),
});

function Profile() {
  const { user, loading, logout } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState<{
    title: string;
    description: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    type: "info" | "error" | "warning" | "success";
    onConfirm?: () => void;
  }>({
    title: "",
    description: "",
    type: "info",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const usrMutation = useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      return await editUsername(id, name);
    },
    onSuccess: () => {
      console.log("User updated successfully");
      setDialogProps({
        title: "Cambios guardados",
        description: "Tu perfil ha sido actualizado correctamente.",
        type: "success",
      });
      setDialogOpen(true);
    },
    onError: (err) => {
      console.error("Error updating user:", err);
      setDialogProps({
        title: "Error",
        description: err.message || "No se pudo actualizar el perfil.",
        type: "error",
      });
      setDialogOpen(true);
    },
  });

  const dltMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!id) {
        throw new Error("User ID is required");
      }
      return await deleteUser(id);
    },
    onSuccess: () => {
      setDialogProps({
        title: "Cuenta eliminada",
        description: "Tu cuenta ha sido desactivada correctamente.",
        type: "success",
      });
      logout();
      setDialogOpen(true);
    },
    onError: (err) => {
      console.error("Error deleting user:", err);
      setDialogProps({
        title: "Error",
        description: err.message || "No se pudo eliminar la cuenta.",
        type: "error",
      });
      setDialogOpen(true);
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);

    usrMutation.mutate({
      id: user?.id || "",
      name: data.name,
    });
  }

  useEffect(() => {
    if (user) {
      form.setValue("name", user.name || "");
      form.setValue("email", user.email || "");
    }
  }, [user, form]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[85vh]">
        <p>Cargando...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[85vh]">
        <p>No tienes acceso a esta página. Por favor, inicia sesión.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Configuracion de perfil</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row items-center gap-4">
          <img
            src={getAvatarUrl(user.email)}
            alt="avatar"
            width={240}
            height={240}
            className="rounded-full"
          />
          <div className="flex-1 align-top h-full">
            <Form {...form}>
              <form
                id="profile-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo electrónico</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de usuario</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-fit self-end"
                  disabled={usrMutation.isPending}
                >
                  {usrMutation.isPending ? (
                    <>
                      <Loader2Icon className="animate-spin" /> Guardando...
                    </>
                  ) : (
                    <>
                      <Save /> Guardar cambios
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Aviso de privacidad y condiciones de uso</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <CardDescription>
            Puedes consultar nuestra política de privacidad y condiciones de uso
            en cualquier momento. Si tienes alguna duda, no dudes en
            contactarnos.
          </CardDescription>

          <CardDescription>
            Puedes rechazar el uso de tus datos personales en cualquier momento.
            Para hacerlo, simplemente puedes dar click en el botón de
            &quot;Eliminar cuenta&quot; en la sección de ajustes.
          </CardDescription>

          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-6">
              <Button
                onClick={() => {
                  setDialogProps({
                    title: "Terminos y condiciones",
                    description: <Terms mode={1} />,
                    type: "info",
                  });
                  setDialogOpen(true);
                }}
              >
                <ExternalLink />
                Terminos y condiciones
              </Button>
              <Button
                onClick={() => {
                  setDialogProps({
                    title: "Aviso de privacidad",
                    description: <Terms mode={2} />,
                    type: "info",
                  });
                  setDialogOpen(true);
                }}
              >
                <ExternalLink />
                Aviso de privacidad
              </Button>
            </div>
            <Button
              variant="destructive"
              onClick={() => {
                setDialogProps({
                  title: "Eliminar cuenta",
                  description:
                    "¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible.",
                  type: "warning",
                  confirmText: "Eliminar cuenta",
                  cancelText: "Cancelar",
                  onConfirm: () => dltMutation.mutate(user?.id),
                });
                setDialogOpen(true);
              }}
              className="w-fit self-end"
            >
              <Trash2 /> Eliminar cuenta
            </Button>
          </div>
        </CardContent>
      </Card>
      <NotificationDialog
        isOpen={dialogOpen}
        setIsOpen={setDialogOpen}
        title={dialogProps.title}
        description={dialogProps.description}
        confirmText={dialogProps.confirmText}
        cancelText={dialogProps.cancelText}
        type={dialogProps.type}
        onConfirm={dialogProps.onConfirm}
      />
    </div>
  );
}

export default Profile;
