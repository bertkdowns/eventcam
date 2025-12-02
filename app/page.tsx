import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import ImageUploader from "./upload/image-uploader";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-4 items-center">
        <h1 className="text-4xl w-full border-b py-4 text-center">EventCam 📸</h1>
        
        <p>Get your photo on the big screen!</p>

        <ImageUploader />
        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-8">
          <Link href="/protected/image-review">Image Review</Link>
          <Link href="/protected/slideshow">Slideshow</Link>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
