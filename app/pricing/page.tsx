import { PricingTable } from "@clerk/nextjs";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing & Plans",
  description: "Choose the perfect plan for your travel planning needs. Choose standard, premium, or enterprise plans to build your personalized travel itineraries with AI.",
};

const page = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      {/* Header Section */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Choose Your Plan</h1>
        <p className="text-lg text-gray-600 mt-2">
          Find the perfect plan for your needs and start your journey today.
        </p>
      </header>

      {/* Pricing Table Section */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <PricingTable />
      </div>

      {/* Call-to-Action Section */}
      <footer className="mt-10 text-center">
        <p className="text-gray-700">
          Need help choosing a plan?{" "}
          <a href="/contact" className="text-blue-500 hover:underline">
            Contact us
          </a>
        </p>
      </footer>
    </div>
  );
};

export default page;
