import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio'
import state from '../store';
import { fadeAnimation, slideAnimation } from '../config/motion'
import {AIPicker, ColorPicker, CustomButton, FilePicker, Tab} from '../components';
import {DecalTypes, EditorTabs, FilterTabs} from '../config/constants'

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile ] = useState('');

  const [ prompt, setPrompt] = useState('')
  const [ generatingImg, setGeneratingImg] = useState()

  const [ activeEditorTab, setActiveEditorTab] = useState('');

  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false
  })


  const generateTabContent = () => {
    console.log(activeEditorTab, 'KKKKKKKKKKKKK');
    switch(activeEditorTab){
      case 'colorpicker':
        return <ColorPicker/>
      case 'filepicker':
        return <FilePicker
          file={file}
          setFile={setFile}
        />
      case 'aipicker':
        return <AIPicker/>
      default:
        break;
    }
  }

  const handelDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;
  }

  const readFile = (type) => {
    reader(file)
    .then((result) => {
      handelDecals(type, result)
      setActiveEditorTab('')
    })
  }
   return (
    <AnimatePresence>
      {
        !snap.intro && (
          <>
            <motion.div
              key='custom'
              className='absolute top-0 left-0 z-10'
              {...slideAnimation('left')}
            >
                <div className='flex items-center min-h-screen'>
                  <div className='editortabs-container tabs'>
                    {
                      EditorTabs.map((tab) => (
                        <Tab
                          key={tab.name}
                          tab={tab}
                          handleClick={() => setActiveEditorTab(tab.name)}
                        />
                      ))
                    }
                    { generateTabContent()}
                  </div>
                </div>
            </motion.div>

            <motion.div
              className='absolute z-10 top-5 right-5'
              {...fadeAnimation}
            >
              <CustomButton
                type={'filled'}
                title={'Go Back'}
                handleClick={() => state.intro = true}
                customStyle={'w-fit px-4 py-2.5 font-bold'}
              />
            </motion.div>

            <motion.div className='filtertabs-container'>
              { FilterTabs.map((tab) => (
                <Tab
                  key={tab.name}
                  tab={tab}
                  isFilterTab
                  isActiveTab=''
                  handleClick={ () => {}}
                />
              ))}
            </motion.div>
          </>
        )
      }
    </AnimatePresence>
  )
}

export default Customizer