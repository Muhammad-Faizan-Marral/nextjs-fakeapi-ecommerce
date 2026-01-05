"use client";
import LandingPage from "../components/home/LandingPage";
import StatsSection from "../components/home/StatsSection";
import CategorieSelection from "../components/Products/CategorieSelection";
import NewsletterForm from "../components/home/NewsletterForm";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useGetProfileMutation } from "../features/auth/mutations";
import { useDispatch } from "react-redux";
import { setActiveUser } from "../features/cart/cartSlice";

const Page = () => {

  return (
    <div>
      <LandingPage />
      <StatsSection />
      <CategorieSelection />
      <NewsletterForm />
      <Footer />
    </div>
  );
};

export default Page;
