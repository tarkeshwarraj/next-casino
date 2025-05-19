export default function hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-24 px-6">
      <h1
        className="text-5xl md:text-6xl font-extrabold mb-6"
        style={{ color: "var(--foreground)" }}
      >
        Welcome to Casino
      </h1>
      <p
        className="text-lg max-w-2xl mb-8"
        style={{ color: "var(--foreground)" }}
      >
        Play. Win. Celebrate. Your luck starts here with exciting games and big
        rewards!
      </p>
      <a
        href="/games"
        className="px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition-all duration-300"
      >
        Start Playing
      </a>
    </section>
  );
}
