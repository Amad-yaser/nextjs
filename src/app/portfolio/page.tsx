'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Filter, Search, Calendar, User, Tag } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function PortfolioPage() {
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "web-development",
      description: "Modern online shopping experience with advanced features including real-time inventory, payment processing, and admin dashboard.",
      image: "/project-ecommerce.jpg",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      client: "Fashion Brand",
      date: "2024",
      featured: true,
      link: "#"
    },
    {
      id: 2,
      title: "Banking Mobile App",
      category: "mobile-development",
      description: "Secure and intuitive mobile banking application with biometric authentication, real-time transactions, and budget tracking.",
      image: "/project-banking.jpg",
      technologies: ["React Native", "TypeScript", "Firebase", "JWT"],
      client: "Fintech Startup",
      date: "2024",
      featured: true,
      link: "#"
    },
    {
      id: 3,
      title: "SaaS Analytics Dashboard",
      category: "web-development",
      description: "Comprehensive analytics dashboard for business intelligence with real-time data visualization and reporting features.",
      image: "/project-dashboard.jpg",
      technologies: ["Next.js", "D3.js", "PostgreSQL", "AWS"],
      client: "Tech Company",
      date: "2023",
      featured: false,
      link: "#"
    },
    {
      id: 4,
      title: "Restaurant Website",
      category: "web-design",
      description: "Elegant website for fine dining establishment with online reservations, menu display, and event management.",
      image: "/project-restaurant.jpg",
      technologies: ["WordPress", "PHP", "MySQL", "Bootstrap"],
      client: "Luxury Restaurant",
      date: "2023",
      featured: false,
      link: "#"
    },
    {
      id: 5,
      title: "Fitness Tracking App",
      category: "mobile-development",
      description: "Comprehensive health and fitness tracking application with workout plans, nutrition tracking, and social features.",
      image: "/project-fitness.jpg",
      technologies: ["Flutter", "Dart", "Firebase", "HealthKit"],
      client: "Fitness Company",
      date: "2023",
      featured: true,
      link: "#"
    },
    {
      id: 6,
      title: "Creative Portfolio",
      category: "web-design",
      description: "Stunning portfolio website for digital agency with interactive animations and dynamic content management.",
      image: "/project-portfolio.jpg",
      technologies: ["Next.js", "Framer Motion", "Sanity CMS", "Vercel"],
      client: "Digital Agency",
      date: "2023",
      featured: false,
      link: "#"
    },
    {
      id: 7,
      title: "Real Estate Platform",
      category: "web-development",
      description: "Property listing platform with advanced search filters, virtual tours, and agent management system.",
      image: "/project-ecommerce.jpg",
      technologies: ["Vue.js", "Laravel", "MySQL", "Mapbox"],
      client: "Real Estate Agency",
      date: "2022",
      featured: false,
      link: "#"
    },
    {
      id: 8,
      title: "Educational App",
      category: "mobile-development",
      description: "Interactive learning platform for students with video lessons, quizzes, and progress tracking.",
      image: "/project-fitness.jpg",
      technologies: ["React Native", "Redux", "Node.js", "AWS"],
      client: "EdTech Company",
      date: "2022",
      featured: false,
      link: "#"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-development', label: 'Mobile Development' },
    { value: 'web-design', label: 'Web Design' }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <div className="min-h-screen bg-white">
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
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <img 
          src="/hero-bg.jpg" 
          alt="Portfolio" 
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Our <span className="text-yellow-400">Portfolio</span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 max-w-3xl mx-auto">
            Showcasing our best work and the success stories we've created with our clients
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-400 text-gray-900 hover:bg-yellow-300">
              View Featured Projects
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
              All Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our most successful and innovative work
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button variant="secondary" size="sm" className="bg-yellow-400 text-gray-900 hover:bg-yellow-300">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Project
                    </Button>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-yellow-500 text-white">
                      Featured
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {project.client}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {project.date}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects with Filters */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse our complete portfolio of work
            </p>
          </div>

          {/* Filters and Search */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    variant={filter === category.value ? "default" : "outline"}
                    className={filter === category.value ? "bg-yellow-500 text-white hover:bg-yellow-600" : ""}
                    onClick={() => setFilter(category.value)}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button variant="secondary" size="sm" className="bg-yellow-400 text-gray-900 hover:bg-yellow-300">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Project
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {project.client}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {project.date}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No projects found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want to See Your Project Here?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's work together to create something amazing. Get in touch and let's discuss your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-yellow-400 text-gray-900 hover:bg-yellow-300">
                Start Your Project
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                Our Services
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
              Creating digital experiences that matter
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
                © 2024 CIAR. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}