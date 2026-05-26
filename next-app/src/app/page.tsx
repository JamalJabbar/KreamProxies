import { FAQ } from './_components/FAQ'
import { Features, UseCases, Workflow } from './_components/Features'
import { FinalCallToAction } from './_components/FinalCallToAction'
import { FlavorMarquee } from './_components/FlavorMarquee'
import { Footer } from './_components/Footer'
import { Hero } from './_components/Hero'
import { LandingExperience } from './_components/LandingExperience'
import { Pricing } from './_components/Pricing'

export default function Home() {
  return (
    <LandingExperience>
      <Hero />
      <FlavorMarquee />
      <Features />
      <Pricing />
      <UseCases />
      <Workflow />
      <FAQ />
      <FinalCallToAction />
      <Footer />
    </LandingExperience>
  )
}
