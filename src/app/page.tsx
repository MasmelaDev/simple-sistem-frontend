import { IconTrash } from "@tabler/icons-react";
export default function Home() {
  return (
    <>
      <h1 className="text-center text-4xl font-semibold text-[#ffb400] py-10">
        Pedidos
      </h1>
      <main className="w-full">
        <form
          action=""
          className="w-full flex flex-col items-center gap-5 justify-center"
        >
          <div className="flex gap-2 items-center w-full justify-center px-10">
            <label htmlFor="phone" className="flex flex-col w-1/2">
              <span>Telefono</span>
              <input
                autoComplete="off"
                className="border rounded-md pl-2 py-1 focus:outline-none focus:boder-none "
                type="text"
                name="phone"
                id="phone"
              />
            </label>
            <label htmlFor="name" className="flex flex-col w-1/2">
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
        </form>
      </main>
      <aside className="flex flex-col  w-full p-5">
        <table className="w-full text-[#333] font-semibold rounded-md overflow-hidden shadow-sm shadow-black/20">
          <thead>
            <tr className="bg-[#ffb400] h-10 font-bold text-white">
              <th>Cant</th>
              <th>Producto</th>
              <th>Total</th>
              <th className="w-1/12"></th>
            </tr>
          </thead>
          <tbody>
            <tr className=" h-12 bg-white text-center">
              <td>1</td>
              <td>Brisket</td>
              <td>17000</td>
              <td className="flex h-12 w-full justify-center items-center">
                <button type="button" className="p-1 rounded-lg bg-red-500">
                  <IconTrash className="text-white" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <section className="w-full">
          <nav>
            <ul className="flex gap-2">
              <li>sandwiches</li>
              <li>bebidas</li>
            </ul>
          </nav>
          <article className=" flex flex-wrap gap-5">
            <button className="border-2 px-2 py-1 rounded ">Brisket</button>
            <button className="border-2 px-2 py-1 rounded ">Pulled Pork</button>
            <button className="border-2 px-2 py-1 rounded ">Costillas</button>
            <button className="border-2 px-2 py-1 rounded ">Pollo</button>
            <button className="border-2 px-2 py-1 rounded ">Chorizo</button>
          </article>
        </section>
      </aside>
    </>
  );
}
