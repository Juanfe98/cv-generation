import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { ValueProposition } from './components/ValueProposition'
import { HowItWorks } from './components/HowItWorks'
import { Features } from './components/Features'
import { TemplateShowcase } from './components/TemplateShowcase'
import { CallToAction } from './components/CallToAction'
import { Footer } from './components/Footer'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <ValueProposition />
        <HowItWorks />
        <Features />
        <TemplateShowcase />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}
