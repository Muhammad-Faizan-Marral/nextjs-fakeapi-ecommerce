"use client";

import Footer from "@/app/components/layout/Footer";
import LandingPage from "@/app/features/home/components/LandingPage";
import NewsletterForm from "@/app/features/home/components/NewsletterForm";
import StatsSection from "@/app/features/home/components/StatsSection";
import CategorieSelection from "@/app/features/products/components/CategorieSelection";


const Page = () => {

  return (
    <div>
      <LandingPage />
      <StatsSection />
      <CategorieSelection />
      <NewsletterForm/>
      <Footer />
    </div>
  );
};

export default Page;
