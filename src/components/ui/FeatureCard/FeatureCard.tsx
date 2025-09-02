"use client";

import React from "react";
import Card from "@/components/ui/Card/Card";
import Image from "next/image";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  gradient?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  image,
  gradient = "from-purple-500 to-pink-500",
}) => {
  return (
    <Card className="group p-8">
      <div
        className={`bg-gradient-to-r ${gradient} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>
      <h3 className="text-2xl font-display font-bold text-white mb-4">
        {title}
      </h3>
      <p className="text-white/70 mb-6">{description}</p>
      {image && (
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="w-full h-32 object-cover rounded-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        />
      )}
    </Card>
  );
};

export default FeatureCard;
