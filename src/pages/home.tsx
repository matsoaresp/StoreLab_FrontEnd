import { Sidebar } from "../components/Sidebar";

interface AppCard {
  nome: string;
  descricao: string;
  imagem: string;
  cor: string; // cor de fundo usada como placeholder enquanto não há imagem real
}

const appsFamosos: AppCard[] = [
  {
    nome: "Sky: Nascidos da Luz",
    descricao: "Voe e ajude os reinos",
    imagem: "",
    cor: "bg-sky-700",
  },
  {
    nome: "SpellBreak: Invoque os 5 Elementos",
    descricao: "Lute com os amigos",
    imagem: "",
    cor: "bg-orange-700",
  },
  {
    nome: "Goat: Simulador de Cabra",
    descricao: "Seja uma cabra",
    imagem: "",
    cor: "bg-blue-300",
  },
  {
    nome: "Fun: A pura diversão",
    descricao: "Explore com alegria",
    imagem: "",
    cor: "bg-pink-600",
  },
  {
    nome: "Myers: O Slasher dos Slashers",
    descricao: "Fuja do assassino",
    imagem: "",
    cor: "bg-zinc-800",
  },
  {
    nome: "Warrior: Guerreiros das Sombras",
    descricao: "Seja um guerreiro",
    imagem: "",
    cor: "bg-red-800",
  },
];

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
        <div className="p-8 md:p-14 lg:pr-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Apps</h1>

          {/* Banner em destaque */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-violet-500 shadow-[0_0_25px_rgba(139,92,246,0.25)] mb-12">
            <div className="relative w-full h-[360px] md:h-[440px] lg:h-[480px] bg-gradient-to-r from-zinc-900 via-zinc-800 to-black">
              {/* Substituir por <img src="..." className="absolute inset-0 w-full h-full object-cover" /> quando houver imagem real */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />

              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-emerald-600 shrink-0" />
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                      Alien: Isolation
                    </h2>
                    <p className="text-base text-gray-300">Jogo de terror</p>
                  </div>
                </div>

                <button className="bg-zinc-400/60 hover:bg-zinc-400/80 transition-colors text-white text-base font-semibold py-3 px-8 rounded-full shrink-0">
                  Visualizar
                </button>
              </div>
            </div>
          </div>

          {/* Apps mais famosos */}
          <div className="flex items-center justify-between mb-7">
            <h3 className="text-xl font-semibold text-white">
              Apps mais famosos
            </h3>
            <a
              href="#"
              className="text-base text-gray-400 hover:text-white transition-colors"
            >
              {">"}
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
            {appsFamosos.map((app) => (
              <div key={app.nome} className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 rounded-xl shrink-0 ${app.cor}`}
                >
                </div>
                <div className="min-w-0">
                  <p className="text-base font-semibold text-white leading-snug truncate">
                    {app.nome}
                  </p>
                  <p className="text-sm text-gray-400 truncate">
                    {app.descricao}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}