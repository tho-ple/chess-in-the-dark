// components/Footer.tsx
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-white/20 py-6 px-4 text-sm flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Left: Links */}
      <div className="flex flex-wrap gap-4">
        <Link href="/imprint" className="hover:underline">
          Impressum
        </Link>
        <a
          href="https://buymeacoffee.com/thomasfplea"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Buy me a coffee
        </a>
        <a
          href="https://github.com/tho-ple/chess-in-the-dark"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          GitHub
        </a>
      </div>

      {/* Right: Credit */}
      <div className="text-white/60">
        Designed by Thomas Pleiner
      </div>
    </footer>
  );
};
