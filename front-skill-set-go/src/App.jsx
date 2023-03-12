import { useState, useEffect } from 'react'
import Form from './Form'
import Results from './Results'
import './App.css'

import axios from 'axios'

function App() {
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)

  const handleSubmit = async (keywords) => {
    toggleShowResult()
    const res = await axios.post('/api/skills', {
      keywords,
    })

    setResults(res.data)

    /* setTimeout(() => {
      setResults(
        [
          "Developed a high-performance Next.js web application using React, Redux, and TypeScript that improved page loading speed by 50% and reduced bounce rates by 25%.",
          "Created dynamic user interfaces and seamless navigation for a Next.js e-commerce application, which resulted in a 20% increase in conversion rates and a 15% increase in revenue.",
        ]
      )
    }, 2000) */
  }

  const toggleShowResult = () => {
    if (showResults) {
      setResults([])
    }
    setShowResults(!showResults)
  }

  return (
    <div className="App h-screen md:max-w-3xl">
      {showResults ? (
        <Results results={results} handleReset={toggleShowResult} />
      ) : (
        <Form handleSubmit={handleSubmit} />
      )}

    </div>
  )
}

export default App
