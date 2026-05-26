import { Container } from "../components/Container";
import { Card } from "../components/Card";
import { Carrossel } from "../components/Carrossel";
import { Sidebar } from "../components/Sidebar";

export function Home() {
  return (
    <Container>
      <div className="flex min-h-screen bg-gray-200">
        
        <Sidebar
  titulo="StoreLab"
  categorias={[
    "Aventura",
    "Quebra-cabeça",
    "Ação",
    "Saúde e Fitness",
    "Corrida",
    "Simulação",
    "RPG",
  ]}
/>

        <main className="flex-1 p-4 md:p-8">
          <Card 
          
          titulo="Jogos"
          descricao="sei la"
          textoBotao="Visualizar"/>

          <div className="mt-8">
            <Carrossel
  itens={[
    { label: "Item 1", color: "bg-purple-500" },
    { label: "Item 2", color: "bg-pink-500" },
    { label: "Item 3", color: "bg-emerald-500" },
  ]}
/>
          </div>
        </main>

      </div>
    </Container>
  );
}