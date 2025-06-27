import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutDashboard, LogOut, Settings, User, Users } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

function Navbar() {
  return (
    <nav className="w-full h-[7vh] bg-sky-200 flex flex-row justify-between items-center px-4">
      <Link href="/" className={buttonVariants({ variant: "ghost" })}>
        Shelver
      </Link>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className={buttonVariants({ variant: "ghost" })}>
            :user:
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link href="/profile">
                <User /> Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings /> Ajustes
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="[&_svg:not([class*='text-'])]:text-muted-foreground gap-2 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
                  <LayoutDashboard /> Dashboard
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/users">
                      <Users /> Usuarios
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              <LogOut /> Cerrar sesion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <Link href="/register" className={buttonVariants({ variant: "ghost" })}>
          Registrarse
        </Link>
        <Link href="/login" className={buttonVariants({ variant: "ghost" })}>
          Iniciar sesion
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
