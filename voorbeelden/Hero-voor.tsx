export function Hero() {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-blue-500">
      <p className="text-xs uppercase tracking-widest text-emerald-500">Nieuw</p>
      <h1 className="font-extrabold bg-clip-text text-transparent">Welkom bij ons platform</h1>
      <button className="transition-all hover:scale-105 shadow-[0_0_30px_rgba(124,58,237,0.5)] animate-pulse">Get started</button>
      <span>{String(i + 1).padStart(2, "0")}</span>
      <Sparkles className="h-4 w-4" />
      <p>We helpen je bedrijf om sneller te groeien met onze slimme oplossingen voor jouw team.</p>
    </section>
  );
}
