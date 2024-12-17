import React from 'react'


// FOR DESIGN
import LogoFittology from "../assets/Logo-Fittology.png"
import poseEstimation from "../assets/PoseEstimation.png"
import monitor from "../assets/Monitor.png"
// FOR DESIGN


import { Button } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate()

  const handleToRegister = () =>{
    navigate('/register')
  }

    return (
        <div className='w-full h-screen bg-gradient-to-br from-[#5A7D94] to-[#1C272E]'>
          <div className='pt-2 pl-3 absolute'>
            <img src={LogoFittology} alt="" className='w-96'/>
          </div>
          <div className='flex w-full items-center place-content-center pl-60'>
            <div className=''>
                <img src={poseEstimation} alt="" className='w-[30rem]'/>
            </div>
            <div className='absolute top-56 ml-10'>
                <h1 className=' poppins-bold w-80 ml-[35rem]  text-lg'><span className='text-white'>Transform Your Workout with AI:</span> <span className='text-[#94C9D8] '>Perfect Your Posture</span><span className='text-white'>, </span><span className='text-[#F7813C]'>Maximize Your Results</span></h1>
                <Button className='ml-[40rem] w-22 mt-3 rounded-full' color='white' onClick={handleToRegister}>REGISTER</Button>
            </div>
            <div className='w-[50rem] mt-12'>
                <img src={monitor} alt="" className='' />
            </div>
          </div>
    
           
        </div>
      )
}

export default Home
