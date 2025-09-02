"use client";

import React from "react";
import Button from "@/components/ui/Button/Button";
import Card from "@/components/ui/Card/Card";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: PricingFeature[];
  buttonText: string;
  buttonHref: string;
  featured?: boolean;
  badge?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  description,
  features,
  buttonText,
  buttonHref,
  featured = false,
  badge,
}) => {
  return (
    <div className="relative">
      {badge && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
            {badge}
          </div>
        </div>
      )}

      <Card
        variant={featured ? "gradient" : "glass"}
        className={`p-8 relative ${featured ? "transform scale-105" : ""}`}
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-display font-bold text-white mb-2">
            {title}
          </h3>
          <div className="text-4xl font-display font-bold text-white mb-2">
            {price}
          </div>
          <p className="text-white/70">{description}</p>
        </div>

        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-white/80">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                  feature.included ? "bg-green-500" : "bg-red-500"
                }`}
              >
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {feature.included ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  )}
                </svg>
              </div>
              {feature.text}
            </li>
          ))}
        </ul>

        <Button
          href={buttonHref}
          variant={featured ? "primary" : "secondary"}
          className="w-full"
        >
          {buttonText}
        </Button>
      </Card>
    </div>
  );
};

export default PricingCard;
