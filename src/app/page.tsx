import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6 py-10">
      <div className="text-center max-w-2xl space-y-8">
        <div className="flex justify-center">
          <div className="w-[138px] h-[40px] text-white drop-shadow-[0_0_10px_#0ff]">
            <svg
              viewBox="0 0 138 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            ></svg>
          </div>
        </div>

        <h1 className="text-5xl font-bold text-white drop-shadow-[0_0_10px_#0ff]">
          Conexa Challenge
        </h1>
        <p className="text-lg text-cyan-300 font-medium">Ignacio Mustafha</p>
        <p className="text-gray-300">
          A technical project built with{" "}
          <span className="text-cyan-400">Next.js</span> and{" "}
          <span className="text-pink-400">Tailwind CSS</span>
        </p>

        <div className="w-full max-w-sm h-[370px] bg-black border border-pink-500 rounded-lg shadow-[0_0_20px_#f0f] overflow-hidden mx-auto">
          <iframe
            className="w-full h-full object-cover"
            src="https://www.youtube.com/embed/VwOR_gaofBI"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="flex flex-col  gap-5">
          <Link
            href="https://docs.google.com/document/d/1vWIKIMs-KeAOXd-IfRnJECf7S0pD4dc4_MJfoRkYGVM/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded border border-cyan-400 text-cyan-400 font-semibold hover:bg-cyan-400 hover:text-black shadow-[0_0_10px_#0ff] hover:shadow-[0_0_20px_#0ff] transition duration-300"
          >
            View Documentation 📄
          </Link>
          <Link
            href="/playground"
            className="inline-block px-6 py-3 rounded border border-cyan-400 text-cyan-400 font-semibold hover:bg-cyan-400 hover:text-black shadow-[0_0_10px_#0ff] hover:shadow-[0_0_20px_#0ff] transition duration-300"
          >
            Let&apos;s See →
          </Link>
        </div>
      </div>
    </main>
  );
}
