import React from "react";
import { Button } from "./ui/button";

function Navbar() {
  return (
    <nav className="w-full h-[7vh] bg-blue-300 flex flex-row justify-between items-center px-4">
      <div>Home</div>
      <Button></Button>
    </nav>
  );
}

export default Navbar;
