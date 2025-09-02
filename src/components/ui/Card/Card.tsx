"use client";

import React from "react";
import { CardProps } from "@/types";

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  variant = "glass",
  hover = true,
}) => {
  const baseClasses = "rounded-3xl border transition-all duration-300";

  const variantClasses = {
    glass: "bg-white/5 backdrop-blur-md border-white/10",
    solid: "bg-background border-border",
    gradient:
      "bg-gradient-to-b from-purple-500/10 to-pink-500/10 backdrop-blur-md border-purple-400/30",
  };

  const hoverClasses = hover ? "hover:border-white/20 hover:bg-white/10" : "";

  const classes = `${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`;

  return <div className={classes}>{children}</div>;
};

export default Card;
