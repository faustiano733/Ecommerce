import Link from "next/link";

export default function Carrinho() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] bg-neutral-500 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-gray-100 text-7xl  md:text-2xl  sm:text-2xl">
        Not Found
      </h1>
      <Link
        href="/"
        className="text-gray-200 bg-slate-500 hover:bg-slate-200 hover:text-gray-800 p-10 "
      >
        Voltar a página Inicial
      </Link>
    </div>
  );
}
