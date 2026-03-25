"use client";

import InstallationForm from "@/components/form/InstallationForm";
import Navbar from "@/components/Navbar";
import Instal from "@/components/installation/InstallationPortugal.jsx";
import React from "react";
import Footer from "@/components/Footer";

function Page() {
  return (
    <>
      <Navbar />
      <Instal />
      <InstallationForm />
      <Footer />
    </>
  );
}

export default Page;
