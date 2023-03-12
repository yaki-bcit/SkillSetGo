import { useState, useEffect } from 'react'
import suggestions from './suggestions'

export default function Form({ handleSubmit }) {
  const [customSkill, setCustomSkill] = useState('')
  const [selectedSkills, setSelectedSkills] = useState([])
  const [activeTab, setActiveTab] = useState('Languages')

  const addSkill = (skill) => {
    const isSelected = selectedSkills.includes(skill)

    if (isSelected) {
      setSelectedSkills(selectedSkills.filter((selectedSkill) => selectedSkill !== skill))
      return 
    }

    const totalSkills = customSkill ? selectedSkills.length + 1 : selectedSkills.length
    if (totalSkills === 5) {
      return
    }
    setSelectedSkills([...selectedSkills, skill])
  }

  const addCustomSkill = (value) => {
    const totalSkills = customSkill ? selectedSkills.length + 1 : selectedSkills.length
    if (totalSkills === 5 && !customSkill) {
      return
    }
    setCustomSkill(value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (customSkill) {
      handleSubmit([...selectedSkills, customSkill])
    } else {
      handleSubmit(selectedSkills)
    }
  }

  return (
    <div className="Form max-h-full sm:min-h-[600px] h-full md:h-auto flex flex-col justify-center md:rounded-2xl px-4 pt-4 sm:px-8 bg-violet-50 dark:bg-[#15002b]">
      <div className='h-full overscroll-y-auto flex flex-col'>
        <div className='page-heading pt-4 mb-4'>
          <h1 className='text-3xl'>
            SkillSetGo!
          </h1>
        </div>

        <div className='welcome text-left'>
          <p className='mb-4'>
            Welcome to an AI-powered resume tool!
          </p>

          <p className='mb-4'>
            Select skills from the list below and/or add your own (up to 5 in total). Then click the button at the bottom to get some inspiration for your resume skill descriptions!
          </p>
        </div>

        <div className='skill-tabs mb-2'>
          {Object.keys(suggestions).map((tab, index) => (
            <button
              type='button'
              title={`Show ${tab} suggestions`}
              onClick={() => setActiveTab(tab)}
              className={`tab ${activeTab === tab ? 'border-violet-600 dark:border-violet-400 text-violet-600 dark:text-violet-400' : 'border-transparent'} border-b-4 font-semibold text-sm mr-2 py-2 px-4 mb-2`}
              key={index}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className='skill-suggestions grow sm:grow-0 md:h-52 w-full overflow-x-auto overflow-auto mb-4'>
          <div title='skill suggestions'>
            {suggestions[activeTab].map((suggestion) => (
              <button 
                className={`suggestion inline-block rounded-3xl px-4 py-2 my-2 mx-1.5 min-w-[20%] sm:min-w-[15%] cursor-pointer text-sm ${selectedSkills.includes(suggestion) ? 'bg-violet-600 text-white' : 'bg-violet-200 text-gray-800 dark:bg-gray-800 dark:text-white'}`} 
                key={suggestion}
                onClick={() => addSkill(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <div className='custom-input mb-6'>
          <input
            type='text'
            title='Add custom skill'
            placeholder='Your unique skill'
            maxLength={35}
            disabled={selectedSkills.length === 5}
            className={`border border-solid border-gray-400 rounded px-3 py-2 w-full ${customSkill.length > 35 ? 'border-red-500' : ''}`}
            onChange={(e) => addCustomSkill(e.target.value)}
          />
        </div>

        <div className='selected-skill-list text-left mb-4'>
          <p>
            <span className='font-semibold mr-1'>
              Skills: 
            </span>
            {customSkill ? selectedSkills.length + 1 : selectedSkills.length} of 5
          </p>
          {/* <p>
            {customSkill ? `${customSkill}` : ''}
            {customSkill && selectedSkills.length > 0 ? ', ' : ''}
            {selectedSkills.length > 0 ? selectedSkills.join(', ') : ''}
          </p> */}
        </div>

        <div className='submit-button'>
          <div className='submit mb-8'>
            <button 
              type='button' 
              title='Get resume lines'
              onClick={onSubmit}
              className='bg-violet-500 text-white font-bold py-2 px-4 rounded'
            >
              SkillSetGo!
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
