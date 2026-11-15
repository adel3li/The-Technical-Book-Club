import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import StarField from "@/components/StarField";

export default function App({ Component, pageProps }) {
  return (
    <div className={`${GeistSans.variable} font-sans`}>
      <StarField />

      <Component {...pageProps} />

      <footer className="w-full py-6 text-center text-sm text-white/40">
        <p>
          Built by{" "}
          <a
            href="https://github.com/adel3li"
            className="hover:text-white/60 transition-colors"
          >
            @adel3li
          </a>
        </p>
      </footer>
    </div>
  );
}
