export const dynamic = "force-dynamic";
import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import React from "react";
import HomeProperties from "@/components/HomeProperties";
import connectDB from "@/config/database";
import FeaturedProperties from "@/components/FeaturedProperties";

export const metadata = {};


const HomePage = async () => {
  await connectDB();
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </>
  );
};

export default HomePage;
