import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "./Navbar";
import { site } from "@/data/club";

// Shared page shell: <title>, description, link-preview (Open Graph / X) tags,
// canonical URL, navbar and page container.
export default function Layout({ title, description = site.description, image = "/og.png", children }) {
  const { asPath } = useRouter();
  const fullTitle = title ? `${title} · ${site.name}` : site.name;
  const path = asPath.split(/[?#]/)[0];
  const url = `${site.url}${path === "/" ? "" : path}`;
  const imageUrl = image.startsWith("http") ? image : `${site.url}${image}`;

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={site.name} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:card" content={image === "/og.png" ? "summary_large_image" : "summary"} />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
      </Head>
      <div className="text-white min-h-screen">
        <Navbar />
        {children}
      </div>
    </>
  );
}
