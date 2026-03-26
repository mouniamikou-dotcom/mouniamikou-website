"use client";

import BusinessServicesPage from "@/components/business/BusinessComponent";
import Footer from "@/components/Footer";
import BusinessForm from "@/components/form/BusinessForm";
import Navbar from "@/components/Navbar";
import React from "react";

function Page() {
  return (
    <>
      <Navbar />
      <BusinessServicesPage />
      <BusinessForm />
      <Footer />
    </>
  );
}

export default Page;
