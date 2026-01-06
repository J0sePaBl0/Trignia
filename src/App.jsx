import React from 'react'
import Hero from './components/Hero'
import ProblemsSection from './components/ProblemsSolve'


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
    </div>
  )
}

export default App
