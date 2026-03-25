"use client";

import Footer from "@/components/Footer";
import RealEstateForm from "@/components/form/RealEtateform";
import Navbar from "@/components/Navbar";
import RealEstateServicesPage from "@/components/realEstateCom/Realestate";
import React from "react";

export default function Page() {
  return (
    <div>
      <Navbar />
      <RealEstateServicesPage />
      <RealEstateForm />
      <Footer />
    </div>
  );
}
