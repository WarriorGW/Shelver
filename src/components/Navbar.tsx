import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";

function Navbar() {
  return (
    <nav className="w-full h-[7vh] bg-primary flex flex-row justify-between items-center px-4">
      <Link href="/" className={buttonVariants({ variant: "ghost" })}>
        Inicio
      </Link>
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
