import React, { useState } from "react";
import { Link } from "react-router-dom";

import ActionButton from "./button/action-button";

function Storefront() {
  const [discovered, setDiscovered] = useState(false);
  const [money, setMoney] = useState(0);
  const [showTextbox, setShowTextbox] = useState(false);

  const [showBlinker, setShowBlinker] = useState(false);
  let [textboxContent, setTextboxContent] = useState("")

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
  
  async function displayText(text, speed) {
    setShowTextbox(true);

    await new Promise(r => setTimeout(r, 100)); // small pause for effect
    for (let i=0; i < text.length; i++) {
      let letter = text.charAt(i);
      setTextboxContent(prevContent => prevContent + letter)
      await new Promise(r => setTimeout(r, speed));
        }

    setShowBlinker(true)
    await textboxClick(document.querySelector('.textbox'))
    textboxClear()
    
  }

  // find a way to set speed to 0/skip textbox animation on click during for loop

  async function shopIntro() {
    await displayText("hello there, "+name+".", 50)
    await displayText("welcome to the store.", 50)
    await displayText("i am the shopkeeper.", 50)
    await displayText("why not take a look around? i have many items for sale.", 50)
  }

  return (
    <div className='flex flex-col gap-2 items-center justify-center w-4/5 h-screen m-auto'> {/* central column */}
      <div className='flex w-full justify-center h-16'>
        <h1 className='text-theme-deskblue drop-shadow-theme md:text-7xl text-6xl'>{discovered ? "storefront" : "??????"}</h1>
      </div>
      {/* image zone */}
      <div className='grid border-4 border-theme-deskblue drop-shadow-theme'> 
        <img src="/assets/storefront/desk-larger.png" alt="black" className='row-start-1 col-start-1 w-full h-full'/>
        <img src="/assets/storefront/bushes-larger.png" alt="bushes" className='row-start-1 col-start-1 w-full h-full' />
        <img src="/assets/storefront/empty_shelves-larger.png" alt="shelves" className='row-start-1 col-start-1 w-full h-full' />
        <img src="/assets/storefront/shelf_jar-larger.gif" alt="jar" className='row-start-1 col-start-1 w-full h-full' />
        <div className='flex justify-start absolute right-2 top-2 gap-2 px-4 py-2 bg-black border-4 border-theme-deskblue w-fit'> {/* money box */}
          <img src="/assets/coin_placeholder.png" alt="money" className='md:size-7 size-6'/>
          <span className='text-white text-xl'>{money}</span>
        </div>
      </div>

      {/* button zone */}
      <div className='flex flex-col md:flex-row md:justify-between gap-2 w-full'>
        <div className='flex grid grid-cols-6 gap-1 w-fit h-full items-center drop-shadow-theme'>
          <ActionButton label="look closer" onClick={() => setDiscovered(true)}>
            <img src="/assets/storefront/buttons/icon_lookcloser-alt.png" className="size-12 filter hover:invert" />
          </ActionButton>
          <ActionButton label="forget" onClick={() => setDiscovered(false)}>
            <img src="/assets/storefront/buttons/icon_forget.png" className="size-12 filter hover:invert" />
          </ActionButton>
          <ActionButton label="+50" onClick={() => updateMoney(50)}>+50</ActionButton>
          <ActionButton label="-50" onClick={() => updateMoney(-50)}>-50</ActionButton> 
          <ActionButton label="speak" disabled={showTextbox} onClick={() => displayText("hello there, "+name+".", 100)}>speak</ActionButton>
          <ActionButton label="dialogue" disabled={showTextbox} onClick={() => shopIntro()}>:3</ActionButton>
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
        <div className="textbox flex justify-between absolute bottom-20 md:w-3/5 w-4/5 h-1/5 p-2 border-4 border-theme-deskblue bg-black hover:cursor-pointer">
          <span className='text-white text-2xl'>{textboxContent}</span>
          {showBlinker && <span className="text-white text-2xl place-self-end">{">"}</span>}
        </div>
      }
    </div>
      
  );
}

export default Storefront;
