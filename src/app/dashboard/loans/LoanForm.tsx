import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loan } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  createLoan,
  getBooksForLoan,
  getUsersForLoan,
  updateLoan,
} from "./actions";
import { useLoansStore } from "./useLoans";

const formSchema = z.object({
  user: z.string(),
  book: z.string(),
  returnDays: z.string(),
});

interface Props {
  loan?: Loan & {
    book: { title: string; author: string; coverImage: string | null };
    user: { name: string | null; email: string; status: string };
  };
  closeDialog: () => void;
}

function LoanForm({ loan, closeDialog }: Props) {
  const { refetchLoans } = useLoansStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user: loan ? loan?.user?.email ?? "" : "",
      book: loan ? loan?.book?.title ?? "" : "",
      returnDays: "3",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    // console.log("Form submitted with values:", data);
    if (loan) {
      editMutation.mutate({ loanId: loan.id, returnDays: data.returnDays });
    } else {
      createMutation.mutate(data);
    }
  }

  const createMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      return await createLoan(data.user, data.book, parseInt(data.returnDays));
    },
    onSuccess: () => {
      form.reset();
      refetchLoans();
      closeDialog();
      console.log("Loan created successfully");
    },
    onError: (error) => {
      console.error("Error creating loan:", error);
    },
  });

  const editMutation = useMutation({
    mutationFn: async ({
      loanId,
      returnDays,
    }: {
      loanId: string;
      returnDays: string;
    }) => {
      return await updateLoan(loanId, parseInt(returnDays));
    },
    onSuccess: () => {
      form.reset();
      refetchLoans();
      closeDialog();
      console.log("Loan updated successfully");
    },
    onError: (error) => {
      console.error("Error updating loan:", error);
    },
  });

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return await getUsersForLoan();
    },
  });

  const { data: books } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      return await getBooksForLoan();
    },
  });

  return (
    <>
      <Form {...form}>
        <form
          id="loan-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="user"
            render={({ field }) =>
              loan ? (
                <FormItem>
                  <FormLabel>Correo electrónico del usuario</FormLabel>
                  <FormControl>
                    <Input disabled value={loan?.user?.email ?? ""} />
                  </FormControl>
                </FormItem>
              ) : (
                <FormItem>
                  <FormLabel>Selecciona usuario</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona usuario" />
                      </SelectTrigger>
                      <SelectContent>
                        {users?.map((user) => (
                          <SelectItem key={user.id} value={user.email}>
                            {user.name ?? user.email}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )
            }
          />
          <FormField
            control={form.control}
            name="book"
            render={({ field }) =>
              loan ? (
                <FormItem>
                  <FormLabel>Nombre del libro</FormLabel>
                  <FormControl>
                    <Input disabled value={loan?.book?.title ?? ""} />
                  </FormControl>
                </FormItem>
              ) : (
                <FormItem>
                  <FormLabel>Selecciona libro</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona libro" />
                      </SelectTrigger>
                      <SelectContent>
                        {books?.map((book) => (
                          <SelectItem key={book.id} value={book.id}>
                            {book.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )
            }
          />
          <FormField
            control={form.control}
            name="returnDays"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modificar dias de prestamo</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona dias" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 dias</SelectItem>
                      <SelectItem value="7">7 dias</SelectItem>
                      <SelectItem value="15">15 dias</SelectItem>
                      <SelectItem value="30">30 dias</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <Button>Guardar</Button>
        </form>
      </Form>
    </>
  );
}

export default LoanForm;
