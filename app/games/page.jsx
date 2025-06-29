// app/games/page.jsx
import Image from "next/image";

export default function GamesPage() {
  const games = [
    {
      id: 1,
      title: "Juwa",
      description: "Exciting adventure game.",
      image: "/images/juwa.png",
      link: "https://dl.juwa777.com/",
    },
    {
      id: 2,
      title: "Game Vault",
      description: "Mind-blowing puzzle game.",
      image: "/images/vault.png",
      link: "https://download.gamevault999.com/",
    },
    {
      id: 3,
      title: "Vegas Sweeps",
      description: "Fast-paced racing game.",
      image: "/images/vegas.png",
      link: "https://m.lasvegassweeps.com/",
    },
    {
      id: 4,
      title: "Orion Star",
      description: "Action packed shooter.",
      image: "/images/orion.png",
      link: "http://start.orionstars.vip:8580/",
    },
    {
      id: 5,
      title: "Sirius",
      description: "Strategy and planning.",
      image: "/images/sirius.png",
      link: "https://m.gamesirius999.com/",
    },
    {
      id: 6,
      title: "Panda Master",
      description: "Casual relaxing fun.",
      image: "/images/panda_master.png",
      link: "https://pandamaster.vip:8888/",
    },
    {
      id: 7,
      title: "Milki Way",
      description: "Casual relaxing fun.",
      image: "/images/milki_way.png",
      link: "https://milkywayapp.xyz/",
    },
     {
      id: 7,
      title: "Fire Kirin",
      description: "Casual relaxing fun.",
      image: "/images/milki_way.png",
      link: "http://play.firekirin.xyz",
    }
  ];

  return (
    <main
      className="min-h-screen p-6 bg-gray-100"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <h1
        className="text-4xl font-bold mb-10 text-center"
        style={{ color: "var(--foreground)" }}
      >
        🎮 Our Games
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game) => (
          <div
            key={game.id}
            className=" rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-[1.03] transition duration-300 ease-in-out border border-gray-300 overflow-hidden flex flex-col"
            style={{
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
            }}
          >
            <a
              href={game.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src={game.image}
                  alt={game.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h2 className="text-2xl font-bold mb-2 group-hover:underline">
                  {game.title}
                </h2>
                <p className="text-sm text-gray-400 mb-4">{game.description}</p>
                <button className="mt-auto bg-blue-400 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition">
                  Play Now
                </button>
              </div>
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}