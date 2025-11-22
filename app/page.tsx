import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <h1>EventCam</h1>

        <Link href="/upload" className="underline"> Upload Event Photo</Link>
        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <Link href="/protected/image-review">Protected Image Review Page</Link>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
