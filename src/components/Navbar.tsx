"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth/useAuth";
import { getAvatarUrl } from "@/lib/getAvatarUrl";
import { User as PrismaUser } from "@prisma/client";
import { LayoutDashboard, LogOut, Settings, User, Users } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";

function Navbar() {
  const { user, loading } = useAuth();

  return (
    <nav className="w-full h-[7vh] bg-sky-200 flex flex-row justify-between items-center px-4">
      <Link href="/" className={buttonVariants({ variant: "ghost" })}>
        Shelver
      </Link>

      {loading ? (
        <Button variant="ghost">Cargando...</Button>
      ) : user ? (
        <UserMenu user={user} />
      ) : (
        <div>
          <Link
            href="/register"
            className={buttonVariants({ variant: "ghost" })}
          >
            Registrarse
          </Link>
          <Link href="/login" className={buttonVariants({ variant: "ghost" })}>
            Iniciar sesion
          </Link>
        </div>
      )}
    </nav>
  );
}

function UserMenu({ user }: { user: PrismaUser }) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className={buttonVariants({ variant: "ghost" })}>
          <img
            src={getAvatarUrl(user.email)}
            alt="avatar"
            width={24}
            height={24}
            className="rounded-full"
          />
          {user.name ? user.name : user.email}
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
            {user.role === "ADMIN" && (
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
            )}
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive">
            <LogOut /> Cerrar sesion
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Navbar;
