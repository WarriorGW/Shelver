import Link from "next/link";
import { buttonVariants } from "./ui/button";

function Navbar() {
  return (
    <nav className="w-full h-[7vh] bg-amber-700 flex flex-row justify-between items-center px-4">
      <Link href="/" className={buttonVariants({ variant: "ghost" })}>
        Shelver
      </Link>
      <div className="flex flex-row gap-4">
        <p>Nombre de usuario</p>
        <p>Rol de usuario</p>
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
