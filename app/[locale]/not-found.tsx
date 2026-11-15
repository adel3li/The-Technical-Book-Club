import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

// Shown for unknown book slugs and other missing pages under /en or /ar.
export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-32 text-center">
      <p className="text-sm font-semibold text-accent-text">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-text">Page not found · الصفحة غير موجودة</h1>
      <Link href="/" className={buttonClass("primary", "md", "mt-8")}>
        Home · الرئيسية
      </Link>
    </Container>
  );
}
