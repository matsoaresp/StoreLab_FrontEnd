import { Carrossel } from "../components/Carrossel";
import { Sidebar } from "../components/Sidebar";

export function Home() {
  return (
    <div className="flex min-h-screen bg-[#202024] text-white overflow-x-hidden">
      
      <Sidebar
        titulo="StoreLab"
        categorias={[
          "Ação",
          "Terror",
          "Corrida",
          "Simulação",
          "RPG",
          "Cartas",
          "Sobrevivencia",
        ]}
      />

      <main className="flex-1 md:ml-64">
        
       
        <div className="p-6 md:p-12 max-w-6xl mx-auto">
          
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start pb-12">
            
            <div className="w-64 h-64 shrink-0 rounded-[32px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative bg-gradient-to-tr from-green-600 to-black">
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-300/20 via-transparent to-black/80"></div>
            </div>

            {/* Informações Principais */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left pt-2">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
                Alien: Isolation
              </h1>
              <h2 className="text-2xl font-medium text-gray-300 mb-6">
                Jogo de terror
              </h2>
              <p className="text-sm font-medium text-gray-400 mb-6">
                Disponível para jogar
              </p>
              <button className="bg-[#9E9E9E] hover:bg-gray-500 transition-all text-white font-bold py-3 px-12 rounded-full shadow-md w-max">
                Jogar
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-around items-center py-10 border-t border-white/10">
            <div className="text-center px-4 mb-4 md:mb-0">
              <p className="text-gray-300 text-sm font-medium mb-2">Avaliações</p>
              <p className="text-4xl font-light text-white tracking-wide">4,8</p>
            </div>
            
            <div className="text-center px-4 mb-4 md:mb-0">
              <p className="text-gray-300 text-sm font-medium mb-2">Categoria</p>
              <p className="text-lg font-normal text-white">Terror</p>
            </div>
            
            <div className="text-center px-4">
              <p className="text-gray-300 text-sm font-medium mb-2">Desenvolvido Por</p>
              <p className="text-lg font-normal text-white uppercase tracking-widest">Alunos</p>
            </div>
          </div>

          <div className="pt-8">
            <Carrossel
              itens={[
                { label: "Cena 1", color: "bg-[#1E1E1E]" },
                { label: "Cena 2", color: "bg-red-900/40" },
                { label: "Cena 3", color: "bg-green-900/20" },
              ]}
            />
          </div>

        </div>
      </main>

    </div>
  );
}