import { useState } from 'react'
import Generating from './Generating'

export default function Results ({ results, handleReset }) {
  const [lines, setLines] = useState([
    "Developed a high-performance Next.js web application using React, Redux, and TypeScript that improved page loading speed by 50% and reduced bounce rates by 25%.",
    "Created dynamic user interfaces and seamless navigation for a Next.js e-commerce application, which resulted in a 20% increase in conversion rates and a 15% increase in revenue.",
  ])

  const [copiedMessage, setCopiedMessage] = useState('')

  const handleCopy = (e, line) => {
    e.preventDefault()
    e.target.classList.add('animate-ping')
    setCopiedMessage('Copied suggestion to clipboard!')
    setTimeout(() => {
      e.target.classList.remove('animate-ping')
      setCopiedMessage('')
    }, 400)
    navigator.clipboard.writeText(line)
  }

  return (
    <div className='results max-h-full h-full w-screen md:h-auto flex flex-col justify-center md:rounded-2xl px-4 pt-4 sm:px-8 bg-violet-50 dark:bg-[#15002b]'>
      {results.length === 0 ? (
        <Generating />
      ) : (
        <>
          <div className='page-heading pt-4 mb-4'>
            <h1 className='text-3xl'>
              SkillSetGo!
            </h1>
          </div>

          <div className="reminder mb-4 text-left">
            <p className="">
              Please remember that these are only suggestions. Your resume
              should be tailored to your experience and the job you are applying
              for.
            </p>
          </div>

          <div className="output-container text-left">
            {results.map((line, index) => (
              <div className="output flex items-center mb-4" key={index}>
                <div className="px-4 py-2 border-solid border-gray-400 bg-white dark:bg-gray-900 rounded border mr-2">
                  <p className="" key={index}>
                    {line}
                  </p>
                </div>

                <button
                  type="button"
                  title="Copy to clipboard"
                  onClick={(e) => handleCopy(e, line)}
                  className="border border-solid border-gray-400 dark:bg-gray-900 rounded px-3 py-2"
                >
                  📋
                </button>
              </div>
            ))}
          </div>

          <div className="copy-message text-center text-xs flex items-center justify-center h-8 mb-4">
            <p className="">{copiedMessage}</p>
          </div>

          <div className="go-back">
            <button
              type="button"
              title="Go back"
              className="bg-violet-500 text-white font-bold py-2 px-4 rounded mb-8"
              onClick={handleReset}
            >
              Go back to selecting skills
            </button>
          </div>
        </>
      )}
    </div>
  );
}