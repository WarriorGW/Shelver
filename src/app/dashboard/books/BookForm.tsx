import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Book } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
});
interface Props {
  book?: Book;
  closeDialog: () => void;
}

function BookForm({ book, closeDialog }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: book ? book.title : "",
    },
  });

  const editMutation = useMutation({
    mutationFn: async () => {
      closeDialog();
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    if (book) {
      // Edit existing book
      editMutation.mutate();
    } else {
      // Create new book
      console.log("Creating new book with title:", data.title);
      // Here you would call the API to create a new book
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}></form>
      </Form>
    </>
  );
}

export default BookForm;
