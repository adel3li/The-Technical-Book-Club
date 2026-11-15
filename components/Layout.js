import Head from "next/head";
import Navbar from "./Navbar";

const SITE_NAME = "The Technical Book Club";
const DEFAULT_DESCRIPTION =
  "A community of developers reading and discussing essential software engineering books together.";

// Shared page shell: <title>, meta description, navbar and page container.
export default function Layout({ title, description = DEFAULT_DESCRIPTION, children }) {
  const fullTitle = title ? `${title} · ${SITE_NAME}` : SITE_NAME;
  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="text-white min-h-screen">
        <Navbar />
        {children}
      </div>
    </>
  );
}
