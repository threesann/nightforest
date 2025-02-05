import React, { useState } from "react";
import { Link } from "react-router-dom";

import Storefront from "./rooms/storefront";

import ActionButton from "../../lib/button/action-button";
import { playAudioById } from "../../lib/audio/audio-handler";

function Mainpage() {

  const [discovered, setDiscovered] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("storefront");
  const [money, setMoney] = useState(0);

  const [showTextbox, setShowTextbox] = useState(false);
  const [showBlinker, setShowBlinker] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  let [textboxContent, setTextboxContent] = useState("")
  let [optionsContent, setOptionsContent] = useState([])

  let name = "David";

  function updateMoney(amt) {
    if (money + amt < 0) // negative check
      return setMoney(0) 
    
    setMoney(money + amt)
  }

  function textboxClick(element) {
    return new Promise(resolve => {
        const handleClick = () => {
            element.removeEventListener('click', handleClick);
            resolve();
        };
        element.addEventListener('click', handleClick);
    });
}

  function textboxClear() {
    setShowTextbox(false)
    setShowBlinker(false)
    setTextboxContent("")
  }
  
  async function displayText(text, speed, voice, choiceLine, choice1, choice2, choice3) {
    setShowTextbox(true);

    await new Promise(r => setTimeout(r, 100)); // small pause for effect
    for (let i=0; i < text.length; i++) {
      let letter = text.charAt(i);
      setTextboxContent(prevContent => prevContent + letter)
      playAudioById(voice)
      await new Promise(r => setTimeout(r, speed));
        }


    if (choiceLine) {
      const options = [choice1, choice2, choice3].filter(choice => choice !== null && choice !== undefined);
      setOptionsContent(options)
      setShowOptions(true)
      await new Promise(r => setTimeout(r, 100)); // small pause for options to load >_>
      return new Promise((resolve) => {
        const choiceboxes = document.querySelectorAll('.choice');
        choiceboxes.forEach((choicebox, index) => {
          choicebox.addEventListener('click', () => {
            resolve(index); // returns index selected; 0, 1 or 2
            setShowOptions(false);
            textboxClear()
          });
        });
      });
    }
    else {
      setShowBlinker(true)
      await textboxClick(document.querySelector('.textbox'))
      textboxClear()
    }
    
    
    
  }

  // find a way to set speed to 0/skip textbox animation on click during for loop

  async function shopIntro() {
    let voice = "voice_shopkeeper"

    await displayText("hello there, "+name+".", 50, voice)
    await displayText("welcome to the store.", 50, voice)
    await displayText("i am the shopkeeper.", 50, voice)
    let selected = await displayText("why not take a look around? i have many items for sale.", 50, voice, true, "who are you?", ">> look around <<")
    if (selected === 0) {
      let selected = await displayText("i am but a humble shopkeep, running a humble shop.", 50, voice, true, "you don't look like any shopkeep i've seen.", "where is this place?")
      if (selected === 0) {
        await displayText("many things around here are likely not as you've seen, traveller.", 50, voice)
        await displayText("in order to prepare yourself for those things... why not have a look at what i have to offer?", 50, voice)
      }
      else if (selected === 1) {
        setDiscovered(true)
        await displayText("you are in the storefront, of course.", 50, voice)
        await displayText("a haven of safety amidst this dark neck of the woods, and one of the finest arrays of imports from its other regions. heh, heh, heh...", 50, voice)
        await displayText("The shopkeeper's laughter transitioned into a low coughing, before he returned his gaze to yours.", 50)
        await displayText("so... take your pick.", 50, voice)
      }
    }
    else if (selected === 1) {
      await displayText("go on, then... take your pick.", 60)
    }
    else {
      await displayText("if you're seeing this, you've broken the site... oh no..............", 50)
    }
  }

  return (
    <div className='flex flex-col gap-2 items-center justify-center w-fit px-2 m-auto h-screen m-auto'> {/* central column */}
      <div className='flex w-full justify-center h-16'>
        <h1 className='text-theme-deskblue drop-shadow-theme md:text-7xl text-6xl'>{discovered ? currentLocation : "??????"}</h1>
      </div>
      {/* display content zone */}
      <div className='grid border-4 border-theme-deskblue drop-shadow-theme'> 
        {currentLocation === "storefront" &&
          <Storefront money={money} />
        }
      </div>

      {/* button zone */}
      <div className='flex flex-col md:flex-row md:justify-between gap-2 w-full'>
        <div className='flex grid grid-cols-6 md:gap-1 gap-0.5 w-fit h-full items-center drop-shadow-theme'>
          <ActionButton label="look closer" onClick={() => setDiscovered(true)}>
            <img src="/assets/storefront/buttons/icon_lookcloser-alt.png" alt="lookcloser" className="size-12 filter hover:invert" />
          </ActionButton>
          <ActionButton label="forget" onClick={() => setDiscovered(false)}>
            <img src="/assets/storefront/buttons/icon_forget.png" alt="forget" className="size-12 filter hover:invert" />
          </ActionButton>
          <ActionButton label="+50" onClick={() => updateMoney(50)}>+50</ActionButton>
          <ActionButton label="-50" onClick={() => updateMoney(-50)}>-50</ActionButton> 
          <ActionButton label="speak" disabled={showTextbox} onClick={() => displayText("hello there, "+name+".", 100)}>speak</ActionButton>
          <ActionButton label="dialogue" disabled={showTextbox} onClick={() => shopIntro()}>:D</ActionButton>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <p className="text-theme-deskblue text-4xl">{name}</p>
          <div className="h-10 w-0.5 bg-theme-deskblue block" />
          <div className="flex flex-col max-h-full">
            <p className="text-theme-deskblue">LEVEL 1</p>
            <p className="text-theme-deskblue">BITCHES: 0</p>
          </div>
        </div>

        <Link to="/hoverpage" className="w-fit h-fit">
          <button className='bg-theme-deskblue hover:bg-theme-active text-black px-2'>
            elsewhere
          </button>
        </Link>
      </div>
      {showTextbox && 
        <div className="flex flex-col gap-0.5 absolute md:bottom-20 bottom-7 md:w-2/5 w-4/5 h-1/4 items-center justify-end">
          {showOptions &&
            <div className="flex flex-row justify-between gap-1 drop-shadow-theme w-full">
              <button className={`choice ${optionsContent.length <= 0 && 'hidden'} w-full bg-theme-deskblue hover:bg-theme-active active:bg-theme-shadowblue3 text-black p-2`}>{optionsContent[0]}</button>
              <button className={`choice ${optionsContent.length <= 1 && 'hidden'} w-full bg-theme-deskblue hover:bg-theme-active active:bg-theme-shadowblue3 text-black p-2`}>{optionsContent[1]}</button>
              <button className={`choice ${optionsContent.length <= 2 && 'hidden'} w-full bg-theme-deskblue hover:bg-theme-active active:bg-theme-shadowblue3 text-black p-2`}>{optionsContent[2]}</button>
            </div>
          }
          <div className={`textbox flex justify-between w-full h-2/3 p-2 border-4 border-theme-deskblue bg-black ${showOptions ? 'hover:none' : 'hover:cursor-pointer'}`}>
            <span className='text-white md:text-2xl text-xl'>{textboxContent}</span>
            {showBlinker && <img src="/assets/blinker.gif" alt="blinker" className="place-self-end md:size-7 size-5" />}
          </div>
          
        </div>
      }
    </div>
      
  );
}

export default Mainpage;
