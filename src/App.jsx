import { useState,useCallback, useEffect, useRef } from "react"

function App() {
  
  const [length,setLength]=useState(8)
  const [numbersAllowed,setNumbersAllowed]=useState(false)
  const [charactorsAllowed,setcharactorsAllowed]=useState(false)
  const [Password,setPassword]=useState("")
  const passwordRef=useRef(null)

  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numbersAllowed) str+="0123456789"
    if(charactorsAllowed) str+="@#$"

    for(let i=0;i<length;i++)
    {
      pass+=str[Math.floor(Math.random()*str.length)]
    }
    setPassword(pass)


  },[length,numbersAllowed,charactorsAllowed, setPassword])

  const copyPassword=useCallback(()=>{
    window.navigator.clipboard.writeText(Password)
  },[Password])
 
  useEffect(() => {
    passwordGenerator();
  }, [length, numbersAllowed, charactorsAllowed, passwordGenerator]);

  return (
    <div className='w-full text-orange-500 bg-gray-500 max-w-md mx-auto px-4 py-3 mt-14 rounded-lg shadow-md'>
      <h1 className='text-white text-center font-bold text-4xl'>Password generater</h1>
      <div className="flex shadow  rounded-lg mb-4 overflow-hidden mt-5">
        <input 
          type="text" 
          value={Password} 
          className="w-full py-1 px-3 outline-none  bg-white text-gray-600 font-bold"  
          placeholder="Password" 
          ref={passwordRef}
          readOnly
        />
        <button 
          onClick={copyPassword}
          className="bg-blue-700 px-2 py-1 font-bold text-white outline-none cursor-pointer">Copy</button>
      </div>
      <div className="flex w-full gap-x-3">

        <div className="flex gap-x-2 items-center">
          <input 
            type="range" 
            min={8} 
            max={12} 
            className="cursor-pointer"  
            value={length} 
            onChange={(e)=>{setLength(e.target.value)}}
          />
          <label className="text-white"> Length:{length}</label>
        </div>

        <div className="flex gap-x-2 items-center">
          <input 
            type="checkbox" 
            className="cursor-pointer"
            defaultChecked={numbersAllowed}
            id="numberInput"
            onClick={()=>{setNumbersAllowed((prev)=>!prev)}}
          />
          <label htmlFor="numbersAllowed" className="text-white"> Numbers</label>
        </div>

        <div className="flex gap-x-2 items-center">
          <input 
            type="checkbox" 
            className="cursor-pointer"
            defaultChecked={charactorsAllowed}
            id="charInput"
            onClick={()=>{setcharactorsAllowed((prev)=>!prev)}}
          />
          <label htmlFor="charectorsAllowed" className="text-white"> charactors</label>
        </div>

      </div>
    </div>
  )
}

export default App
