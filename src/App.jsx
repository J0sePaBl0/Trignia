import React from 'react'
import Hero from './components/sections/Hero'
import ProblemsSection from './components/sections/ProblemsSolve'
import Steps from './components/sections/Steps'
import WhySection from './components/sections/WhySection'
import Testimonials from './components/sections/Testimonials'
import ContactForm from './components/ContactForm'


function App() {
  return (
    <div>
      <Hero
        videoSrc="/videos/hero.mp4"
        onSecondaryClick={() => {
          const el = document.getElementById('problems');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
        onPrimaryClick={() => console.log("Secondary CTA")}
      />
      <ProblemsSection />
      <Steps />
      <WhySection />
      <Testimonials />
      <ContactForm />
    </div>
  )
}

export default App
