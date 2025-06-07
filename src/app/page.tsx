import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Button>a</Button>
      <Link href="/signin">
        <Button>Sign In / Sign Up</Button>
      </Link>
    </div>
  );
}
