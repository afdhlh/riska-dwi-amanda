import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

const VIDEO_URL =
  "https://iwrzrhzudouhsubndord.supabase.co/storage/v1/object/public/video-romantis/Romatis.mp4";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Untuk Riska Dwi Amanda" },
      { name: "description", content: "Satu pesan spesial berisi maaf dan terima kasih untuk Riska Dwi Amanda." },
      { property: "og:title", content: "Untuk Riska Dwi Amanda" },
      { property: "og:description", content: "Satu pesan spesial berisi maaf dan terima kasih." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e?.isIntersecting && (el.classList.add("in"), io.disconnect()),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Particles() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const ps = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        left: Math.random() * 100,
        size: 2 + Math.random() * 5,
        dur: 12 + Math.random() * 16,
        delay: -Math.random() * 25,
        k: i,
      })),
    [],
  );
  if (!ready) return null;
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      {ps.map((p) => (
        <span
          key={p.k}
          className="absolute rounded-full bg-rose-gradient"
          style={{
            left: `${p.left}%`,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            filter: "blur(1px)",
            animation: `floatUp ${p.dur}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

const sections = [
  {
    label: "Pembuka",
    title: "Di antara ribuan hari yang berlalu, keputusan terbaikku adalah melangkah bersamamu.",
    body: [
      "Ternyata hari demi hari kita lewati bersama. Ada tawa yang bikin kita lupa waktu, tapi engga jarang juga ada badai kecil yang menguji kita. Di balik semua alur yang tidak selalu mulus, satu hal yang paling aku syukuri adalah: kita masih di sini, berjalan beriringan dan tidak saling melepas.",
    ],
  },
  {
    label: "Permintaan Maaf",
    title: "Untuk setiap sudut kekuranganku yang pernah membuatmu lelah...",
    body: [
      "Aku mau meminta maaf yang paling tulus dari lubuk hatiku.",
      "Maaf untuk setiap kali egoku bergerak lebih cepat daripada rasa pahamku. Maaf kalau di beberapa hari, aku sulit dimengerti, terlalu keras kepala, atau secara tidak sengaja mengeluarkan kata-kata yang melukai hatimu.",
      "Aku sadar aku masih jauh dari kata sempurna sebagai pasangan. Maaf kalau kadang belum bisa sepenuhnya peka dengan apa yang kamu rasakan, atau belum bisa menjadi tempat bersandar yang seutuhnya kamu butuhkan saat harimu sedang sulit. Maaf atas hari-hari di mana aku membuatmu merasa berjuang sendirian.",
    ],
  },
  {
    label: "Terima Kasih",
    title: "Namun di atas semua ketidaksempurnaanku, kamu selalu memilih untuk bertahan...",
    body: [
      "Terima kasih banyak, ya.",
      "Terima kasih karena dari awal kita memulai hingga detik ini, kamu tidak pernah menyerah pada kita. Terima kasih untuk kesabaranmu yang seolah tidak ada batasnya, untuk setiap kali kamu memilih mengalah demi menjaga ruang hangat di antara kita, dan untuk selalu merangkul kekuranganku saat aku sendiri sulit menerimanya.",
      "Terima kasih sudah menjadi rumah, teman berdiskusi, dan tempat teraman untuk aku menjadi diri sendiri tanpa perlu berpura-pura. Hadirmu membuat hariku jauh lebih tenang, dan cara kamu mencintaiku mengajariku banyak hal tentang arti dewasa yang sebenarnya.",
    ],
  },
];

function Envelope({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const click = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, 1400);
  };
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background px-6 transition-all duration-700 ${opening ? "delay-700 opacity-0 scale-110" : ""}`}
    >
      <p className="mb-8 text-center font-display text-3xl italic leading-snug sm:text-4xl">
        Satu Pesan Spesial Untuk
        <br />
        <span className="text-rose-gradient not-italic font-semibold">Riska Dwi Amanda</span>
      </p>
      <button
        onClick={click}
        aria-label="Buka amplop"
        className="relative h-48 w-72 animate-glow rounded-2xl glass [perspective:800px] transition-transform hover:scale-105"
      >
        {/* flap */}
        <span
          className="absolute inset-x-0 top-0 h-1/2 origin-top bg-rose-gradient opacity-90 transition-transform duration-700"
          style={{
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            transform: opening ? "rotateX(180deg)" : "none",
          }}
        />
        {/* ribbon */}
        <span
          className={`absolute inset-y-0 left-1/2 w-3 -translate-x-1/2 bg-accent transition-all duration-500 ${opening ? "scale-y-0 opacity-0" : ""}`}
        />
        <span
          className={`absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary font-display text-2xl text-primary-foreground transition-all duration-500 ${opening ? "scale-0" : ""}`}
        >
          ♥
        </span>
      </button>
      <p className="mt-8 text-sm tracking-[0.3em] uppercase text-muted-foreground">Ketuk untuk membuka</p>
    </div>
  );
}

function Index() {
  const [open, setOpen] = useState(false);
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Particles />
      {!open && <Envelope onOpen={() => setOpen(true)} />}
      {open && (
        <div className="relative mx-auto max-w-2xl px-5 py-20">
          <Reveal>
            <p className="text-center text-xs tracking-[0.4em] uppercase text-muted-foreground">Untuk</p>
            <h1 className="mt-2 text-center font-display text-5xl font-semibold text-rose-gradient sm:text-6xl">
              Riska Dwi Amanda
            </h1>
          </Reveal>

          {sections.map((s) => (
            <section key={s.label} className="mt-16 rounded-3xl glass p-7 sm:p-10">
              <Reveal>
                <p className="text-xs tracking-[0.35em] uppercase text-accent">{s.label}</p>
                <h2 className="mt-3 font-display text-3xl italic leading-tight sm:text-4xl">{s.title}</h2>
              </Reveal>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-foreground/85">
                {s.body.map((p, i) => (
                  <Reveal key={i} delay={i * 120}>
                    <p>{p}</p>
                  </Reveal>
                ))}
              </div>
            </section>
          ))}

          <Reveal>
            <div className="mx-auto my-16 w-full max-w-[min(340px,86vw)]">
              <VideoPlayer />
            </div>
          </Reveal>

          <Reveal>
            <p className="pb-10 text-center font-display text-2xl italic text-rose-gradient">Selalu, untukmu. ♥</p>
          </Reveal>
        </div>
      )}
    </main>
  );
}
