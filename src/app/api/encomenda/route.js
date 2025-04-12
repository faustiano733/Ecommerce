import { NextResponse } from "next/server.js";
import { enviarEmail } from "@services/emailService.js";
import { criarEncomenda } from "@services/encomendaService.js"



function gerarHTML(factura) {
  let lista_produtos = "";

  factura.produtos.map((produto) => {
    lista_produtos += `
      <tr style="border: 1px solid black;">
        <td style="padding: 5px; text-align: center;">${produto.quantidade}</td>
        <td style="padding: 5px; text-align: left;">${produto.nome}</td>
        <td style="padding: 5px; text-align: right;">${produto.preco}</td>
        <td style="padding: 5px; text-align: right;">${(produto.preco * produto.quantidade)}</td>
      </tr>`;
  });

  const html = `
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Factura</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #ddd; border-radius: 5px;">
          <!-- Cabeçalho -->
          <tr>
            <td style="padding: 20px; text-align: center; background-color: #4CAF50; color: #ffffff;">
              <h1 style="margin: 0; font-size: 24px;">Factura</h1>
            </td>
          </tr>
          <!-- Informações da Empresa e Cliente -->
          <tr>
            <td style="padding: 20px; font-size: 14px; color: #333;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align: top; width: 50%;">
                
                    <p>Comércio Geral e Prestação de Serviços, LDA</p>
                    <p>NIF: 5001692470</p>
                    <p>Endereço: Luanda, Maianga, Bairro Gamek à direita</p>
                    <p>Contactos: 927 056 454</p>
                    <p>Email: bemtoc.suporte@gmail.com</p>
                    <p>Luanda - Angola</p>
                  </td>
                  <td style="vertical-align: top; width: 50%; text-align: right;">
                    <p>Encomenda: <strong>${factura.referencia}</strong></p>
                    <p>Data: <strong>${factura.data}</strong></p>
                    <p>Cliente: <strong>${factura.cliente.nome}</strong></p>
                    <p>Endereço: <strong>${factura.local.nome}</strong></p>
                    <p>Contacto: <strong>${factura.cliente.contacto}</strong></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Tabela de Produtos -->
          <tr>
            <td style="padding: 20px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; font-size: 14px;">
                <thead>
                  <tr style="background-color: #4CAF50; color: #ffffff;">
                    <th style="border: 1px solid black; padding: 5px;">Qtd</th>
                    <th style="border: 1px solid black; padding: 5px;">Designação</th>
                    <th style="border: 1px solid black; padding: 5px;">Preço Unitário</th>
                    <th style="border: 1px solid black; padding: 5px;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${lista_produtos}
                  <tr style="background-color: #f9f9f9; font-weight: bold;">
                    <td colspan="3" style="padding: 5px; text-align: right;">Total Geral:</td>
                    <td style="padding: 5px; text-align: right;">${factura.total}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <!-- Rodapé -->
          <tr>
            <td style="padding: 20px; text-align: center; font-size: 12px; color: #666;">
              <p>Edvaldo Alfredo Tito Manuel, NIF: 005676509LA044-2020-AGT-218</p>
              <p>&copy; 2024 Bemtoc - Todos os direitos reservados.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return html;
}

export async function POST(request) {
  try {
    // Proteger para garantir que está vindo um corpo válido
    if (!request?.json) {
      return NextResponse.json({ error: "Requisição inválida" }, { status: 400 });
    }

    const dados = await request.json();

    const fatura = await criarEncomenda(dados.produtos, dados.cliente, dados.local);
    const html = gerarHTML(fatura);

    await enviarEmail(fatura.cliente.email, html);

    return NextResponse.json(fatura);
  } catch (error) {
    console.error("Erro em /api/encomenda:", error);
    return NextResponse.json({ error: "Erro ao processar requisição" }, { status: 500 });
  }
}


