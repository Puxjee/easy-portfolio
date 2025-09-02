"use client";

import React, { useEffect } from "react";
import { ArrowRight, Star, Zap, Palette, Code, Globe } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import Card from "@/components/ui/Card/Card";

const HomePage = () => {
  // Scroll-to-reveal animation on scroll
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
          entry.target.classList.remove("opacity-0", "translate-y-8");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    });

    // Observe all elements with scroll-reveal class
    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Hero Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm mb-8 animate-fade-in-up">
            <Star className="w-4 h-4 mr-2 text-yellow-400" />
            Trusted by 10,000+ creators worldwide
          </div>

          {/* Hero Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 animate-fade-in-up animation-delay-200">
            Create Stunning
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent block">
              Portfolios
            </span>
            in Minutes
          </h1>

          {/* Hero Description */}
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 animate-fade-in-up animation-delay-400">
            Build beautiful, professional portfolios that showcase your work and
            attract clients. No coding required, infinite possibilities.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up animation-delay-600">
            <Button href="/register" size="lg">
              Start Building Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button href="/showcase" variant="outline" size="lg">
              View Examples
            </Button>
          </div>

          {/* Hero Image */}
          <div className="relative max-w-5xl mx-auto animate-fade-in-up animation-delay-800">
            <Card variant="glass" className="p-2">
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=700&fit=crop&crop=center"
                alt="Portfolio Dashboard Preview"
                width={1200}
                height={700}
                className="w-full rounded-2xl shadow-2xl"
              />
            </Card>{" "}
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 animate-float">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-white text-sm">Live Preview</span>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 animate-float animation-delay-1000">
              <div className="flex items-center space-x-3">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-white text-sm">Fast Deploy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Features Section */}
      <section
        id="features"
        className="px-4 sm:px-6 lg:px-8 mt-32 scroll-reveal opacity-0 translate-y-8 transition-all duration-800"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Powerful Features for
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block">
                Creative Professionals
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Everything you need to create, customize, and share stunning
              portfolios that get results
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            {/* Feature Content */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">
                    Beautiful Templates
                  </h3>
                  <p className="text-white/70">
                    50+ professionally designed templates for every industry and
                    style. From minimalist to bold, we have the perfect design
                    for your brand.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">
                    Drag & Drop Builder
                  </h3>
                  <p className="text-white/70">
                    Intuitive visual editor with drag-and-drop functionality. No
                    coding skills required - just point, click, and create.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">
                    Custom Domains
                  </h3>
                  <p className="text-white/70">
                    Connect your own domain or use our subdomain. Professional
                    URLs that match your brand identity.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">
                    Lightning Fast
                  </h3>
                  <p className="text-white/70">
                    Optimized for speed and performance. Your portfolio loads
                    instantly, keeping visitors engaged.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Image */}
            <div className="relative">
              <Card variant="glass" className="p-4">
                <Image
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&crop=center"
                  alt="Portfolio Builder Interface"
                  width={600}
                  height={400}
                  className="w-full rounded-2xl"
                />
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="px-4 sm:px-6 lg:px-8 mt-32 scroll-reveal opacity-0 translate-y-8 transition-all duration-800"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Simple, Transparent
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block">
                Pricing
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Choose the perfect plan for your needs. Start free, upgrade
              anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 relative">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-display font-bold text-white mb-2">
                  Starter
                </h3>
                <div className="text-4xl font-display font-bold text-white mb-2">
                  $0
                </div>
                <p className="text-white/70">Perfect for getting started</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-white/80">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  1 Portfolio
                </li>
                <li className="flex items-center text-white/80">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  3 Templates
                </li>
                <li className="flex items-center text-white/80">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  Basic Customization
                </li>
                <li className="flex items-center text-white/80">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  Subdomain Hosting
                </li>
              </ul>

              <Button href="/register" variant="outline" className="w-full">
                Get Started Free
              </Button>
            </div>

            {/* Pro Plan - Featured */}
            <div className="bg-gradient-to-b from-purple-500/10 to-pink-500/10 backdrop-blur-md rounded-3xl p-8 border border-purple-400/30 relative transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-display font-bold text-white mb-2">
                  Professional
                </h3>
                <div className="text-4xl font-display font-bold text-white mb-2">
                  $12
                </div>
                <p className="text-white/70">per month, billed annually</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-white/80">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  Unlimited Portfolios
                </li>
                <li className="flex items-center text-white/80">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  50+ Premium Templates
                </li>
                <li className="flex items-center text-white/80">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  Custom Domain
                </li>
                <li className="flex items-center text-white/80">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  Advanced Analytics
                </li>
                <li className="flex items-center text-white/80">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  Priority Support
                </li>
              </ul>

              <Button href="/register" className="w-full">
                Start Free Trial
              </Button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 relative">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-display font-bold text-white mb-2">
                  Enterprise
                </h3>
                <div className="text-4xl font-display font-bold text-white mb-2">
                  $49
                </div>
                <p className="text-white/70">For teams and agencies</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-white/80">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  Everything in Pro
                </li>
                <li className="flex items-center text-white/80">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  Team Collaboration
                </li>
                <li className="flex items-center text-white/80">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  White Label Solution
                </li>
                <li className="flex items-center text-white/80">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  Dedicated Support
                </li>
              </ul>

              <Button href="/contact" variant="outline" className="w-full">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 lg:px-8 mt-32">
        <div className="max-w-4xl mx-auto">
          <Card variant="gradient" className="p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="animate-fade-in-up">
                <div className="text-4xl font-display font-bold text-white mb-2">
                  10K+
                </div>
                <div className="text-white/70">Happy Users</div>
              </div>
              <div className="animate-fade-in-up animation-delay-200">
                <div className="text-4xl font-display font-bold text-white mb-2">
                  50K+
                </div>
                <div className="text-white/70">Portfolios Created</div>
              </div>
              <div className="animate-fade-in-up animation-delay-400">
                <div className="text-4xl font-display font-bold text-white mb-2">
                  100+
                </div>
                <div className="text-white/70">Templates</div>
              </div>
              <div className="animate-fade-in-up animation-delay-600">
                <div className="text-4xl font-display font-bold text-white mb-2">
                  99%
                </div>
                <div className="text-white/70">Satisfaction</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 mt-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Ready to build your
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block">
              Dream Portfolio?
            </span>
          </h2>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            Join thousands of creators who trust PortfolioMaker to showcase
            their work beautifully.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button href="/register" size="lg">
              Get Started for Free
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
