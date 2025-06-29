import Image from "next/image";
import Link from 'next/link';
import Hero from "../components/HeroSection"
import Features from "../components/Features";
import SpinnerWheel from "@/components/SpinWheel";
import TopRatedGames from "@/components/TopRatedGames";
import HeroSection from "../components/HeroSection";
import WelcomeBonus from "@/components/WelcomeBonus";
import GameCategories from "@/components/GameCategories";
import HotGames from "@/components/HotGames";
import Promotions from "@/components/Promotions";



export default function Home() {
  return (
    <div >   
      <HeroSection/>
      <WelcomeBonus/>
      <GameCategories/>
      <HotGames/>
      <Promotions/>
    </div>
  );
}
