"use client";

import React from "react";
import {
  Palette,
  Code,
  Globe,
  Zap,
  Users,
  Shield,
  Smartphone,
  ChartLine,
} from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import FeatureCard from "@/components/ui/FeatureCard/FeatureCard";
import Card from "@/components/ui/Card/Card";

const FeaturesPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-32">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
            Powerful Features for
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block">
              Creative Professionals
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-12">
            Everything you need to create, customize, and share stunning
            portfolios that get results
          </p>
          <Button href="/register" size="lg">
            Start Building Free
          </Button>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="px-4 sm:px-6 lg:px-8 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Palette className="w-7 h-7 text-white" />}
              title="Beautiful Templates"
              description="50+ professionally designed templates for every industry and style. From minimalist to bold designs."
              image={{
                src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop&crop=center",
                alt: "Template Preview",
                width: 400,
                height: 200,
              }}
              gradient="from-purple-500 to-pink-500"
            />

            <FeatureCard
              icon={<Code className="w-7 h-7 text-white" />}
              title="Drag & Drop Builder"
              description="Intuitive visual editor with drag-and-drop functionality. No coding skills required."
              image={{
                src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop&crop=center",
                alt: "Drag and Drop Editor",
                width: 400,
                height: 200,
              }}
              gradient="from-blue-500 to-purple-500"
            />

            <FeatureCard
              icon={<Globe className="w-7 h-7 text-white" />}
              title="Custom Domains"
              description="Connect your own domain or use our subdomain. Professional URLs that match your brand."
              image={{
                src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop&crop=center",
                alt: "Live Portfolio",
                width: 400,
                height: 200,
              }}
              gradient="from-green-500 to-blue-500"
            />

            <FeatureCard
              icon={<Zap className="w-7 h-7 text-white" />}
              title="Lightning Fast"
              description="Optimized for speed and performance. Your portfolio loads instantly, keeping visitors engaged."
              gradient="from-yellow-500 to-orange-500"
            />

            <FeatureCard
              icon={<Users className="w-7 h-7 text-white" />}
              title="Team Collaboration"
              description="Work with your team seamlessly. Share, review, and collaborate on portfolio projects."
              gradient="from-indigo-500 to-purple-500"
            />

            <FeatureCard
              icon={<Shield className="w-7 h-7 text-white" />}
              title="Secure & Reliable"
              description="Enterprise-grade security with 99.9% uptime. Your data is safe and always accessible."
              gradient="from-emerald-500 to-teal-500"
            />
          </div>
        </div>
      </section>

      {/* Detailed Feature Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Feature Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                  Built for Modern
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block">
                    Creators
                  </span>
                </h2>
                <p className="text-xl text-white/70 mb-8">
                  Our platform combines cutting-edge technology with intuitive
                  design to help you create portfolios that stand out.
                </p>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">
                    Mobile Responsive
                  </h3>
                  <p className="text-white/70">
                    Your portfolio looks perfect on every device. Automatic
                    mobile optimization ensures great user experience.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ChartLine className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">
                    Advanced Analytics
                  </h3>
                  <p className="text-white/70">
                    Track visitors, page views, and engagement metrics.
                    Understand how your audience interacts with your work.
                  </p>
                </div>
              </div>

              <Button href="/register" size="lg">
                Get Started Now
              </Button>
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

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card variant="gradient" className="p-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Ready to Create Your
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block">
                Perfect Portfolio?
              </span>
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who trust PortfolioMaker to showcase
              their work beautifully.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/register" size="lg">
                Start Free Trial
              </Button>
              <Button href="/showcase" variant="outline" size="lg">
                View Examples
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
