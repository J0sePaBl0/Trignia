import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import bot from '/bot.svg'
import './App.css'
import Spline from '@splinetool/react-spline';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div class = "relative border-4 border-red-500 w-full h-screen">
      <bot/>
      <div class= "absolute w-full h-1 bottom-2 flex border-2 border-amber-500 bg-amber-700"></div>
    </div>
    </>
  )
}

export default App
