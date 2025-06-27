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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, UserRole } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { editUser } from "./actions";
import { useUsersStore } from "./useUsers";

const userRoles = Object.values(UserRole) as [UserRole, ...UserRole[]];

const formSchema = z.object({
  name: z.union([
    z.string().min(5, "Al menos 5 caracteres").max(15, "Máximo 15 caracteres"),
    z.literal(""),
  ]),
  role: z.enum(userRoles),
});

interface Props {
  user: User;
  closeDialog: () => void;
}

function UserFormDialog({ user, closeDialog }: Props) {
  const { refetchUsers } = useUsersStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name || "",
      role: user.role,
    },
  });

  const editMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return await editUser(user.id, formData);
    },
    onSuccess: () => {
      form.reset();
      refetchUsers();
      closeDialog();
      console.log("User updated successfully");
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("role", data.role);

    editMutation.mutate(formData);
  }

  return (
    <>
      <Form {...form}>
        <form
          id="register-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      form.trigger("name");
                    }}
                    onBlur={() => form.trigger("name")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {userRoles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button>Guardar</Button>
        </form>
      </Form>
    </>
  );
}

export default UserFormDialog;
