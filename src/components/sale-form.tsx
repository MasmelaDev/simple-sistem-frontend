"use client";

import { useState } from "react";
import { type productsInSale } from "@prisma/client";
import { addSale } from "@/actions/actions";
import { ProductsInSale } from "./products-in-sale";
export const SaleForm = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [saleType, setSaleType] = useState("delivery");
  const [productsInSale, setProductsInSale] = useState<productsInSale[]>([]);

  const updateProductsInSale = (product: productsInSale) => {
    setProductsInSale([...productsInSale, product]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addSale(formData);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center gap-5 justify-center"
    >
      <div className="flex gap-2 items-center w-full justify-center px-10">
        {saleType === "delivery" && (
          <label htmlFor="phone" className="flex flex-col w-full">
            <span>Telefono</span>
            <input
              autoComplete="off"
              className="border rounded-md pl-2 py-1 focus:outline-none focus:boder-none "
              type="text"
              name="phone"
              id="phone"
            />
          </label>
        )}
        <label htmlFor="name" className="flex flex-col w-full">
          <span>Nombre</span>
          <input
            autoComplete="off"
            className="border rounded-md pl-2 py-1 focus:outline-none focus:boder-none"
            type="text"
            name="name"
            id="name"
          />
        </label>
      </div>
      <div className="flex gap-5 self-start px-10">
        <label htmlFor="" className="flex gap-2 items-center">
          <span>Pedido a domicilio</span>
          <input
            type="radio"
            className="border rounded-md pl-2 py-1 focus:outline-none focus:boder-none"
            name="saleType"
            onChange={() => setSaleType("delivery")}
            value={"delivery"}
          />
        </label>
        <label htmlFor="" className="flex gap-2 items-center">
          <span>Para llevar</span>
          <input
            type="radio"
            className="border rounded-md pl-2 py-1 focus:outline-none focus:boder-none"
            name="saleType"
            onChange={() => setSaleType("pickUp")}
            value={"pickUp"}
          />
        </label>
        <label htmlFor="" className="flex gap-2 items-center">
          <span>Para comer aqui</span>
          <input
            type="radio"
            className="border rounded-md pl-2 py-1 focus:outline-none focus:boder-none"
            name="saleType"
            onChange={() => setSaleType("eatHere")}
            value={"eatHere"}
          />
        </label>
      </div>
      {saleType === "delivery" && (
        <div className="flex gap-2 items-center w-full justify-center px-10">
          <label className="flex flex-col w-1/2">
            <span>Direccion</span>
            <div className="flex gap-1 items-center">
              <input
                type="text"
                autoComplete="off"
                className="border rounded-md pl-2 py-1 focus:outline-none focus:boder-none w-1/2"
                name="street"
              />
              #
              <input
                autoComplete="off"
                className="border rounded-md pl-2 py-1 focus:outline-none focus:boder-none w-1/2"
                type="text"
                name="number"
              />
            </div>
          </label>
          <label htmlFor="neighborhood" className="flex flex-col w-1/2">
            <span>Barrio</span>
            <input
              autoComplete="off"
              className="border rounded-md pl-2 py-1 focus:outline-none focus:boder-none"
              type="text"
              name="neighborhood"
              id="neighborhood"
            />
          </label>
        </div>
      )}

      <label htmlFor="observations" className="self-start px-10 w-full ">
        <span>Observaciones</span>
        <textarea
          className="border rounded-md pl-2 py-1 focus:outline-none focus:boder-none w-full resize-none"
          name="observations"
          id="observations"
        ></textarea>
      </label>
      <ProductsInSale
        updateProductsInSale={updateProductsInSale}
        searchParams={searchParams}
      />
      <button
        type="submit"
        className="bg-[#ffb400] text-white font-semibold py-2 px-5 rounded-md"
      >
        enviar
      </button>
    </form>
  );
};
