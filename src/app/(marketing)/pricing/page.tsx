"use client";

import React from "react";
import PricingCard from "@/components/ui/PricingCard/PricingCard";
import Button from "@/components/ui/Button/Button";
import Card from "@/components/ui/Card/Card";
import { Check, X, Star, Users, Shield } from "lucide-react";

const PricingPage = () => {
  const starterFeatures = [
    { text: "1 Portfolio", included: true },
    { text: "3 Templates", included: true },
    { text: "Basic Customization", included: true },
    { text: "Subdomain Hosting", included: true },
    { text: "Custom Domain", included: false },
    { text: "Premium Templates", included: false },
    { text: "Analytics", included: false },
  ];

  const professionalFeatures = [
    { text: "Unlimited Portfolios", included: true },
    { text: "50+ Premium Templates", included: true },
    { text: "Advanced Customization", included: true },
    { text: "Custom Domain", included: true },
    { text: "Advanced Analytics", included: true },
    { text: "Priority Support", included: true },
    { text: "Team Collaboration", included: false },
  ];

  const enterpriseFeatures = [
    { text: "Everything in Professional", included: true },
    { text: "Team Collaboration", included: true },
    { text: "White Label Solution", included: true },
    { text: "Advanced Security", included: true },
    { text: "Dedicated Support", included: true },
    { text: "Custom Integrations", included: true },
    { text: "SLA Guarantee", included: true },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-32">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm mb-8">
            <Star className="w-4 h-4 mr-2 text-yellow-400" />
            14-day free trial • No credit card required
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
            Simple, Transparent
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block">
              Pricing
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-12">
            Choose the perfect plan for your needs. Start free, upgrade anytime.
            All plans include core features to build stunning portfolios.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 sm:px-6 lg:px-8 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <PricingCard
              title="Starter"
              price="$0"
              description="Perfect for getting started"
              features={starterFeatures}
              buttonText="Get Started Free"
              buttonHref="/register"
            />

            <PricingCard
              title="Professional"
              price="$12"
              description="per month, billed annually"
              features={professionalFeatures}
              buttonText="Start Free Trial"
              buttonHref="/register"
              featured={true}
              badge="Most Popular"
            />

            <PricingCard
              title="Enterprise"
              price="$49"
              description="For teams and agencies"
              features={enterpriseFeatures}
              buttonText="Contact Sales"
              buttonHref="/contact"
            />
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="px-4 sm:px-6 lg:px-8 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Compare All Features
            </h2>
            <p className="text-xl text-white/70">
              See everything that&apos;s included in each plan
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left p-6 text-white font-display font-bold text-lg">
                      Features
                    </th>
                    <th className="text-center p-6 text-white font-display font-bold text-lg">
                      Starter
                    </th>
                    <th className="text-center p-6 text-white font-display font-bold text-lg">
                      Professional
                    </th>
                    <th className="text-center p-6 text-white font-display font-bold text-lg">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {[
                    {
                      feature: "Number of Portfolios",
                      starter: "1",
                      pro: "Unlimited",
                      enterprise: "Unlimited",
                    },
                    {
                      feature: "Templates",
                      starter: "3 Basic",
                      pro: "50+ Premium",
                      enterprise: "50+ Premium",
                    },
                    {
                      feature: "Custom Domain",
                      starter: false,
                      pro: true,
                      enterprise: true,
                    },
                    {
                      feature: "Analytics",
                      starter: false,
                      pro: true,
                      enterprise: "Advanced",
                    },
                    {
                      feature: "Priority Support",
                      starter: false,
                      pro: true,
                      enterprise: "Dedicated",
                    },
                    {
                      feature: "Team Collaboration",
                      starter: false,
                      pro: false,
                      enterprise: true,
                    },
                    {
                      feature: "White Label",
                      starter: false,
                      pro: false,
                      enterprise: true,
                    },
                  ].map((row, index) => (
                    <tr key={index}>
                      <td className="p-6 text-white/80 font-medium">
                        {row.feature}
                      </td>
                      <td className="p-6 text-center">
                        {typeof row.starter === "boolean" ? (
                          row.starter ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-red-500 mx-auto" />
                          )
                        ) : (
                          <span className="text-white/70">{row.starter}</span>
                        )}
                      </td>
                      <td className="p-6 text-center">
                        {typeof row.pro === "boolean" ? (
                          row.pro ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-red-500 mx-auto" />
                          )
                        ) : (
                          <span className="text-white/70">{row.pro}</span>
                        )}
                      </td>
                      <td className="p-6 text-center">
                        {typeof row.enterprise === "boolean" ? (
                          row.enterprise ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-red-500 mx-auto" />
                          )
                        ) : (
                          <span className="text-white/70">
                            {row.enterprise}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center">
              <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-display font-bold text-white mb-2">
                10,000+
              </h3>
              <p className="text-white/70">Happy Customers</p>
            </Card>

            <Card className="p-8 text-center">
              <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-display font-bold text-white mb-2">
                99.9%
              </h3>
              <p className="text-white/70">Uptime Guarantee</p>
            </Card>

            <Card className="p-8 text-center">
              <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-display font-bold text-white mb-2">
                4.9/5
              </h3>
              <p className="text-white/70">Customer Rating</p>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "Can I change plans at any time?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll pro-rate any billing differences.",
              },
              {
                q: "Is there a free trial?",
                a: "Yes! We offer a 14-day free trial for all paid plans. No credit card required to start your trial.",
              },
              {
                q: "What happens to my data if I cancel?",
                a: "Your data remains accessible for 30 days after cancellation. You can export your portfolios at any time during this period.",
              },
              {
                q: "Do you offer refunds?",
                a: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, we'll refund your payment in full.",
              },
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-display font-bold text-white mb-2">
                  {faq.q}
                </h3>
                <p className="text-white/70">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card variant="gradient" className="p-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Join thousands of creators building beautiful portfolios with
              PortfolioMaker
            </p>

            <Button href="/register" size="lg">
              Start Your Free Trial
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
