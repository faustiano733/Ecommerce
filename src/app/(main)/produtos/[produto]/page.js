import ClientPageProduto from "./ProdutoPage";

export async function generateStaticParams() {
  const produtos = await fetch('/api/produtos');
  
  return produtos.map((produto) => ({
    produto:produto.nome, // Supondo uma função de slugificação
  }));
}


export default async function Page({ params }) {

  return (
    <ClientPageProduto 
      produto={params.produto}
    />
  );
}