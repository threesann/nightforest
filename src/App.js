import './App.css';
import React, { useState } from "react";

function App() {
  const [discovered, setDiscovered] = useState(false);

  const discoverZone = () => {
    setDiscovered(true);
  };

  const forgetZone = () => {
    setDiscovered(false);
  };

  return (
    <div className='flex flex-col gap-2 items-center justify-center w-4/5 h-screen m-auto'> {/* central column */}
      <div className='flex justify-center items-center h-16'>
        <h1 className='text-theme-deskblue drop-shadow-theme text-7xl'>{discovered ? "storefront" : "??????"}</h1>
      </div>
      <div className='relative w-[1280px] h-[724px] border-4 border-theme-shadowblue'> {/* image box */}
        <img src="/assets/storefront/desk-larger.png" alt="black" className='absolute'/>
        <img src="/assets/storefront/bushes-larger.png" alt="bushes" className='absolute' />
        <img src="/assets/storefront/empty_shelves-larger.png" alt="bushes" className='absolute' />
      </div>
      <div className='flex flex-row gap-2 w-fit items-center'>
        <button className='border-none bg-theme-deskblue hover:bg-theme-active text-black px-2' onClick={() => discoverZone()}>look closer</button>
        <button className='border-none bg-theme-deskblue hover:bg-theme-active text-black px-2' onClick={() => forgetZone()}>forget</button>
      </div>
    </div>
  );
}

export default App;
