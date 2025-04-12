import Image from "next/image";

export default function Facturas() {
  return (
    <div>
      <div className="flex justify-between space-x-72">
        <div className="flex flex-col items-start space-y-2 w-1/2 ml-6">
          <Image
            width={200}
            height={80}
            src="/image/bemtoc.png"
            alt="logotipo da bemtoc"
            className="rounded-lg mb-4"
          />
          <div>
            <p>Comércio Geral e Prestação de Serviços, LDA</p>
            <p>NIF: 5001692470</p>
            <p>Endereço: Luanda, Maianga, Bairro Gamek à direita</p>
            <p>Contactos: 927 056 454</p>
            <p>Email: bemtoc.suporte@gmail.com</p>
            <p>Luanda - Angola</p>
          </div>
        </div>

        <div className="flex flex-col space-y-2 w-1/2 mt-48">
          <p>FRM 13B2023 a 50 Factura Recibo Nª 2</p>
          <p>Data:</p>
          <p>Cliente:</p>
          <p>Endereço:</p>
          <p>Contacto:</p>
        </div>
      </div>

      <table className="table-auto border-collapse w-full mt-8">
        <thead>
          <tr className="border border-black">
            <th className="border border-black px-4 py-2">Qtd</th>
            <th className="border border-black px-4 py-2">Designação</th>
            <th className="border border-black px-4 py-2">Preço Unitário</th>
            <th className="border border-black px-4 py-2">Desc.(%)</th>
            <th className="border border-black px-4 py-2">Taxa de Imp. %</th>
            <th className="border border-black px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border border-black">
            <td className="border border-black px-4 py-2">Quantidade:</td>
            <td className="border border-black px-4 py-2">Descrição:</td>
            <td className="border border-black px-4 py-2">Preço:</td>
            <td className="border border-black px-4 py-2">--</td>
            <td className="border border-black px-4 py-2">---</td>
            <td className="border border-black px-4 py-2">Total: KZ</td>
          </tr>

          <tr className="border border-black">
            <td className="border border-black px-4 py-2" colSpan={3}></td>
            <td
              className="border border-black px-4 py-2 text-center"
              colSpan={2}
            >
              Total
            </td>
            <td className="border border-black px-4 py-2">KZ 0</td>
          </tr>
        </tbody>
      </table>

      <div className="mt-4">
        <div>
          <p className="text-sm">
            Edvaldo Alfredo Tito Manuel, NIF: 005676509LA044-2020-AGT-218
          </p>
        </div>
      </div>
    </div>
  );
}
