import { SaleForm } from "@/components/sale-form";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      <h1 className="text-center text-4xl font-semibold text-[#ffb400] py-10">
        Pedidos
      </h1>
      <main className="w-full">
        <SaleForm searchParams={searchParams} />
      </main>
    </>
  );
}
