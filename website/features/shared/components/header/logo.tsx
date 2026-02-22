import Link from "next/link";

export function Logo() {
  return (
    <Link href={"/"} className="text-xl">
      <span className="font-bold">Health</span>
      Care
    </Link>
  );
}
