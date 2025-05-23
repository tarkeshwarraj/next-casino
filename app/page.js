import Image from "next/image";
import Link from 'next/link';
import Hero from "../components/Hero"
import Features from "../components/Features";
import SpinnerWheel from "@/components/SpinWheel";
import TopRatedGames from "@/components/TopRatedGames";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen md:px-6">   
      <Hero/>
      <TopRatedGames/>
      <Features/>
      <SpinnerWheel />
    </main>
  );
}
