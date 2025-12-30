'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Check, Star, Users, Crown, Zap, Shield, HeadphonesIcon, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

export default function PricingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for individuals and small projects',
      icon: <Users className="w-8 h-8 text-blue-500" />,
      monthlyPrice: 0,
      annualPrice: 0,
      badge: null,
      features: [
        'List up to 3 websites',
        'Basic profile page',
        'Standard support',
        'Community access',
        'Basic analytics',
        'Mobile responsive'
      ],
      limitations: [
        'No featured listings',
        'Basic search visibility',
        'Limited portfolio items'
      ],
      cta: 'Get Started',
      ctaLink: '/signup',
      popular: false
    },
    {
      name: 'Professional',
      description: 'Ideal for growing businesses and agencies',
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
      monthlyPrice: 29,
      annualPrice: 290,
      badge: 'Most Popular',
      features: [
        'List up to 20 websites',
        'Enhanced profile page',
        'Priority support',
        'Advanced analytics',
        'Featured listings (2/month)',
        'SEO optimization',
        'Custom domain',
        'Lead generation tools',
        'Portfolio showcase',
        'Client testimonials'
      ],
      limitations: [],
      cta: 'Start Free Trial',
      ctaLink: '/signup',
      popular: true
    },
    {
      name: 'Business',
      description: 'Complete solution for established companies',
      icon: <Crown className="w-8 h-8 text-purple-500" />,
      monthlyPrice: 79,
      annualPrice: 790,
      badge: 'Best Value',
      features: [
        'Unlimited website listings',
        'Premium profile page',
        '24/7 dedicated support',
        'Real-time analytics',
        'Unlimited featured listings',
        'Advanced SEO tools',
        'Multiple custom domains',
        'Advanced lead management',
        'Video portfolio',
        'Client management system',
        'Team collaboration tools',
        'API access',
        'White-label options'
      ],
      limitations: [],
      cta: 'Start Free Trial',
      ctaLink: '/signup',
      popular: false
    },
    {
      name: 'Enterprise',
      description: 'Custom solutions for large organizations',
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      monthlyPrice: 199,
      annualPrice: 1990,
      badge: 'Enterprise',
      features: [
        'Everything in Business',
        'Custom integrations',
        'Dedicated account manager',
        'Custom branding',
        'Advanced security features',
        'SLA guarantee',
        'Training sessions',
        'Custom reporting',
        'Priority placement',
        'Exclusive partnerships',
        'Advanced API access',
        'Custom workflows',
        'Multi-language support',
        'Advanced fraud protection'
      ],
      limitations: [],
      cta: 'Contact Sales',
      ctaLink: '/contact',
      popular: false
    }
  ];

  const additionalServices = [
    {
      name: 'Featured Listing',
      description: 'Get your website featured on the homepage for 7 days',
      price: 49,
      duration: 'per week'
    },
    {
      name: 'Premium Promotion',
      description: 'Comprehensive marketing campaign across all channels',
      price: 199,
      duration: 'per month'
    },
    {
      name: 'SEO Optimization',
      description: 'Professional SEO services to improve visibility',
      price: 299,
      duration: 'one-time'
    },
    {
      name: 'Content Creation',
      description: 'Professional content writing for your listings',
      price: 99,
      duration: 'per project'
    }
  ];

  const faqs = [
    {
      question: 'Can I change my plan anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
    },
    {
      question: 'Is there a free trial available?',
      answer: 'Yes, we offer a 14-day free trial for Professional and Business plans. No credit card required.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.'
    },
    {
      question: 'Can I cancel my subscription?',
      answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.'
    },
    {
      question: 'Do you offer discounts for non-profits?',
      answer: 'Yes, we offer a 50% discount for registered non-profit organizations. Contact us for more information.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use industry-standard encryption and security measures to protect your data.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="CIAR" className="w-8 h-8" />
              <span className={`text-2xl font-bold ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                CIAR
              </span>
            </Link>
            
            <Link href="/">
              <Button variant="ghost" className={scrolled ? 'text-gray-700' : 'text-white'}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-gray-900 to-gray-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Simple, Transparent <span className="text-yellow-400">Pricing</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Choose the perfect plan for your business. No hidden fees, no surprises.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-lg ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-yellow-500"
            />
            <span className={`text-lg ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Annual
            </span>
            {isAnnual && (
              <Badge className="bg-yellow-500 text-white ml-2">
                Save 20%
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-yellow-500 scale-105' : ''} hover:shadow-xl transition-all duration-300`}>
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className={`${plan.popular ? 'bg-yellow-500 text-white' : 'bg-purple-500 text-white'} px-4 py-1`}>
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    {plan.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {plan.name}
                  </CardTitle>
                  <p className="text-gray-600 text-sm">
                    {plan.description}
                  </p>
                  <div className="mt-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900">
                        ${isAnnual ? plan.annualPrice / 12 : plan.monthlyPrice}
                      </span>
                      <span className="text-gray-500 ml-2">/month</span>
                    </div>
                    {isAnnual && plan.monthlyPrice > 0 && (
                      <p className="text-sm text-green-600 mt-1">
                        Save ${(plan.monthlyPrice * 12 - plan.annualPrice)} annually
                      </p>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                    {plan.limitations.map((limitation, idx) => (
                      <div key={idx} className="flex items-start space-x-2 opacity-60">
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex-shrink-0 mt-0.5"></div>
                        <span className="text-sm text-gray-500">{limitation}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link href={plan.ctaLink}>
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                          : plan.name === 'Enterprise'
                          ? 'bg-purple-600 text-white hover:bg-purple-700'
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Additional Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enhance your listing with our premium services
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    ${service.price}
                  </div>
                  <div className="text-sm text-gray-500 mb-4">
                    {service.duration}
                  </div>
                  <Button variant="outline" className="w-full">
                    Order Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Compare Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See exactly what you get with each plan
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold text-gray-900">Feature</th>
                  <th className="text-center p-4 font-semibold text-gray-900">Starter</th>
                  <th className="text-center p-4 font-semibold text-gray-900">Professional</th>
                  <th className="text-center p-4 font-semibold text-gray-900">Business</th>
                  <th className="text-center p-4 font-semibold text-gray-900">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4">Website Listings</td>
                  <td className="text-center p-4">3</td>
                  <td className="text-center p-4">20</td>
                  <td className="text-center p-4">Unlimited</td>
                  <td className="text-center p-4">Unlimited</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4">Featured Listings</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4">2/month</td>
                  <td className="text-center p-4">Unlimited</td>
                  <td className="text-center p-4">Unlimited</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4">Analytics</td>
                  <td className="text-center p-4">Basic</td>
                  <td className="text-center p-4">Advanced</td>
                  <td className="text-center p-4">Real-time</td>
                  <td className="text-center p-4">Custom</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4">Support</td>
                  <td className="text-center p-4">Standard</td>
                  <td className="text-center p-4">Priority</td>
                  <td className="text-center p-4">24/7</td>
                  <td className="text-center p-4">Dedicated</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4">Custom Domain</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4">✓</td>
                  <td className="text-center p-4">✓</td>
                  <td className="text-center p-4">✓</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4">API Access</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4">✓</td>
                  <td className="text-center p-4">Advanced</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Got questions? We've got answers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using CIAR to grow their online presence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-yellow-400 text-gray-900 hover:bg-yellow-300">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                Talk to Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <img src="/logo.png" alt="CIAR" className="w-8 h-8" />
              <h3 className="text-2xl font-bold">CIAR</h3>
            </div>
            <p className="text-gray-400 mb-6">
              The ultimate marketplace for websites and digital services
            </p>
            <div className="flex justify-center space-x-6 mb-8">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                GitHub
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Instagram
              </a>
            </div>
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400">
                © 2024 CIAR Marketplace. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}