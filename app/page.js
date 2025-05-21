import Image from "next/image";
import Link from 'next/link';
import Hero from "../components/Hero"
import Features from "../components/Features";
import SpinnerWheel from "@/components/SpinWheel";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen px-6">   
      <Hero/>
      <Features/>
      <SpinnerWheel />
    </main>
  );
}
