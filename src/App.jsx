import React from 'react'
import Hero from './components/Hero'
import ProblemsSection from './components/ProblemsSolve'


function App() {
  return (
    <div>
      <Hero
        videoSrc="/videos/hero.mp4"
        onPrimaryClick={() => console.log("Primary CTA")}
        onSecondaryClick={() => console.log("Secondary CTA")}
      />
      <ProblemsSection />
    </div>
  )
}

export default App
