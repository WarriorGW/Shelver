import { loanBook } from "@/app/actions";
import { useAuth } from "@/lib/auth/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Book } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import NotificationDialog, { NotifProps } from "./NotificationDialog";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Form, FormField, FormItem, FormLabel } from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const formSchema = z.object({
  returnDays: z.string(),
});

function BookCard(book: Book) {
  const [returnDays, setReturnDays] = useState("3");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState<NotifProps>({
    title: "",
    description: "",
  });
  const { user } = useAuth();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      returnDays: "3",
    },
  });

  const loanMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      if (!user) {
        throw new Error("User not authenticated");
      }
      return await loanBook(book.id, user.id, parseInt(data.returnDays));
    },
    onSuccess: (data) => {
      setDialogProps({
        title: "Libro apartado",
        description: `El libro ${
          book.title
        } ha sido apartado hasta ${data.dueDate.toLocaleDateString("es-Es")}.`,
        type: "success",
      });
      setDialogOpen(true);
    },
    onError: (error: Error) => {
      setDialogProps({
        title: "Error al apartar el libro",
        description: error.message,
        type: "error",
      });
      setDialogOpen(true);
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setReturnDays(data.returnDays);
    console.log(`Selected return days: ${data.returnDays} or ${returnDays}`);
  }

  return (
    <Card className="w-64 flex flex-col">
      <CardHeader className="text-center">
        <img
          src={book.coverImage || "/no_cover.webp"}
          alt={book.title}
          className="w-full aspect-square object-cover rounded-lg"
        />
        <CardTitle className="text-center">{book.title}</CardTitle>
        <p className="text-sm text-gray-500">{book.author}</p>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 justify-between">
        <p className="text-sm text-gray-700 flex-1">{book.description}</p>
        <p className="text-xs text-gray-400 mt-2">
          Publicado el {new Date(book.createdAt).toLocaleDateString()}
        </p>
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-4 align-bottom"
          onClick={() => {
            if (!user) {
              setDialogProps({
                title: "Iniciar sesión",
                description: "Por favor, inicia sesión para apartar un libro.",
                type: "info",
                confirmText: "Iniciar sesión",
                cancelText: "Cancelar",
                onConfirm: () => {
                  router.push("/login");
                },
              });
              setDialogOpen(true);
              return;
            }
            setDialogProps({
              title: "Apartar libro",
              description: (
                <div className="space-y-4">
                  <p>
                    ¿Estás seguro de que quieres apartar el libro
                    <strong>{book.title}</strong>?
                  </p>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <FormField
                        control={form.control}
                        name="returnDays"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Dias de prestamo</FormLabel>
                            <Select
                              defaultValue={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona dias" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="3">3 dias</SelectItem>
                                <SelectItem value="7">7 dias</SelectItem>
                                <SelectItem value="15">15 dias</SelectItem>
                                <SelectItem value="30">30 dias</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </div>
              ),
              type: "info",
              confirmText: "Apartar",
              cancelText: "Cancelar",
              onConfirm: form.handleSubmit((data) => {
                console.log(
                  `Apartando libro: ${book.id} por ${data.returnDays} días, usuario: ${user.id}`
                );
                loanMutation.mutate(data);
                form.reset({ returnDays: "3" });
              }),
            });
            setDialogOpen(true);
          }}
        >
          Apartar
        </Button>
      </CardContent>
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
    </Card>
  );
}

export default BookCard;
