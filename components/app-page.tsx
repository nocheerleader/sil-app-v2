"use client"

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

const messages = [
  "Beyond RESEARCH: I provide a comprehensive understanding of the landscape, combining user, market, and technology insights.",
  "Beyond IDEATION: I develop future-proofed, durable scenarios particular to the brand and the organizational strength and vision.",
  "Beyond A STRATEGY: I prepare leaders to continually adapt and respond to changes in the marketplace with time-tested dynamic foresight techniques."
]

const projects = [
  {
    id: '5',
    title: "Smart Pricing System for Danone v55",
    subtitle: "Dynamic Pricing Strategy for Food & Beverage",
    image: "/images/silvana-img.png",
    description: "A comprehensive Smart Pricing system that leverages machine learning and real-time market data to optimize pricing strategies across diverse global markets.",
    link: "/projects/danone",
    country: "France",
  },
  {
    id: '1',
    title: "Kayanee - Tech-Driven Wellness Ecosystem",
    subtitle: "Empowering Women's Health in Saudi Arabia",
    image: "/images/silvana-img.png",
    description: "A revolutionary digital platform that combines AI-driven personalization with culturally sensitive design to transform women's health experiences in the Middle East.",
    link: "/projects/kayanee",
    country: "Saudi Arabia",
  },
  {
    id: '2',
    title: "CHiME Care - Digital Health Evolution",
    subtitle: "Revolutionizing Ophthalmic Practices Globally",
    image: "/images/silvana-img.png",
    description: "An innovative design system that bridges cultural gaps in healthcare UX, enhancing accessibility and user comprehension across diverse global markets.",
    link: "/projects/chime-care",
    country: "United States",
  },
  {
    id: '3',
    title: "Nomade - Digital Hospitality Platform",
    subtitle: "Redefining Guest Experience Through Technology",
    image: "/images/silvana-img.png",
    description: "A sustainable, AI-powered hospitality ecosystem that adapts to guests' cultural backgrounds, offering personalized experiences while minimizing environmental impact.",
    link: "/projects/nomade",
    country: "Mexico",
  },
  {
    id: '4',
    title: "Augmented Coding - AI Development Platform",
    subtitle: "Transform Your Codebase into a Dynamic, Navigable Data Warehouse",
    image: "/images/silvana-img.png",
    description: "An innovative AI-driven development tool that enhances coding efficiency and collaboration across global teams, with built-in localization support.",
    link: "/projects/augmented-coding",
    country: "Global",
  }
]

// First, let's define the Project type
interface Project {
  id: string
  title: string
  subtitle: string
  image: string
  description: string
  link: string
  country: string
}

// Then update the ProjectCard component with proper types
const ProjectCard = ({ 
  project,
  direction 
}: {
  project: Project
  direction: 'right' | 'left'
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 'right' ? '100%' : '-100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction === 'right' ? '-100%' : '100%' }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.5 
      }}
      className="relative w-full h-[calc(100vh-12rem)] rounded-xl overflow-hidden"
    >
      <Image
        src={project.image}
        alt={project.title}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-500 ease-in-out transform hover:scale-105"
        priority
      />
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      />
      <motion.div 
        className="absolute inset-x-0 bottom-0 p-16 max-w-[90%] mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="relative z-10 space-y-6">
          <motion.h3 
            className="text-5xl sm:text-6xl font-bold leading-tight text-[#f0e6d2]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {project.title}
          </motion.h3>
          <motion.p 
            className="text-2xl sm:text-3xl text-[#e6d5b8]/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {project.subtitle}
          </motion.p>
          <motion.p 
            className="text-lg sm:text-xl max-w-3xl leading-relaxed text-[#e6d5b8]/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {project.description}
          </motion.p>
          <motion.div 
            className="pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Link href={project.link}>
              <Button 
                className="group bg-[#e6d5b8] hover:bg-[#f0e6d2] text-black rounded-full px-8 py-4 sm:px-10 sm:py-6 text-lg sm:text-xl font-medium transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                View Project
                <ArrowRight className="ml-3 h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function BlockPage() {
  const [activeSection, setActiveSection] = useState('home')
  const [scrollY, setScrollY] = useState(0)
  const [currentMessage, setCurrentMessage] = useState(-1)
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState<'right' | 'left'>('right')

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      const sections = ['home', 'about', 'work', 'experience', 'services', 'stack', 'contact']
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(section)
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentMessage((prev) => (prev + 1) % (messages.length + 1))
    }, 5000)

    return () => clearTimeout(timer)
  }, [currentMessage])

  const nextProject = useCallback(() => {
    setDirection('right')
    setActiveIndex((current) => (current + 1) % projects.length)
  }, [])

  const prevProject = useCallback(() => {
    setDirection('left')
    setActiveIndex((current) => (current - 1 + projects.length) % projects.length)
  }, [])

  return (
    <div className="min-h-screen bg-black text-[#e6d5b8]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-50 backdrop-blur-md">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            silvana.
          </Link>
          <ul className="hidden md:flex space-x-6">
            {['HOME', 'ABOUT', 'WORK', 'EXPERIENCE', 'SERVICES', 'STACK', 'CONTACT'].map((item) => (
              <li key={item}>
                <button
                  className={`text-sm ${activeSection === item.toLowerCase() ? 'text-[#e6d5b8]' : 'text-[#e6d5b8] opacity-70'}`}
                  onClick={() => setActiveSection(item.toLowerCase())}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
          <button className="px-4 py-2 bg-[#e6d5b8] text-black rounded-full hover:bg-[#d6c5a8] transition-colors">
            LETS TALK
          </button>
        </nav>
      </header>

      <main>
        <section id="work" className="min-h-screen bg-black text-[#f0e6d2] py-20 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-16 text-center"
            >
              Featured Work
            </motion.h2>
            <div className="relative w-full mb-12">
              <AnimatePresence initial={false} custom={direction}>
                <ProjectCard 
                  key={projects[activeIndex].id} 
                  project={projects[activeIndex]} 
                  direction={direction as 'right' | 'left'} 
                />
              </AnimatePresence>
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-[#f0e6d2]/10 hover:bg-[#f0e6d2]/20 rounded-full p-4 transition-all duration-300"
                onClick={prevProject}
                aria-label="Previous project"
              >
                <ChevronLeft className="h-10 w-10 text-[#f0e6d2]" />
              </button>
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-[#f0e6d2]/10 hover:bg-[#f0e6d2]/20 rounded-full p-4 transition-all duration-300"
                onClick={nextProject}
                aria-label="Next project"
              >
                <ChevronRight className="h-10 w-10 text-[#f0e6d2]" />
              </button>
            </div>
            <div className="flex justify-center space-x-4 mt-8">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'bg-[#f0e6d2] scale-125' : 'bg-[#e6d5b8] hover:bg-[#f0e6d2]'
                  }`}
                  onClick={() => {
                    setDirection(index > activeIndex ? 'right' : 'left')
                    setActiveIndex(index)
                  }}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Other sections (home, about, experience, services, stack, contact) would go here */}
      </main>

      <footer className="bg-black text-[#f0e6d2] py-8">
        {/* Footer content */}
      </footer>

      <div className="fixed right-0 bottom-1/4 hidden lg:block" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
        <h2 className="text-6xl font-bold transform -rotate-90 origin-bottom-right whitespace-nowrap">
          Experience Design
        </h2>
      </div>
    </div>
  )
}