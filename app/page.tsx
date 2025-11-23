import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <div></div>
        <h1 className="text-4xl">EventCam 📸</h1>
        
        <p>Get your photo on the big screen!</p>

        <Link href="/upload" className="underline"> Upload Event Photo</Link>
        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <Link href="/protected/image-review">Image Review</Link>
          <Link href="/protected/slideshow">Slideshow</Link>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
