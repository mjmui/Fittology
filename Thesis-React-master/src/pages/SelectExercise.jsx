import React, {useState, useEffect} from 'react'
import { json, useNavigate } from 'react-router-dom'
import axios from 'axios'




import logo from '../assets/Logo.png'
import bicepcurlGIF from '../gif/bicep-curl.gif'
import gobletSquatGIF from '../gif/goblet-squat.gif'
import { Typography, Button } from '@material-tailwind/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'


const SelectExercise = () => {

    const [bicepCurlShow, setBicepCurlShow] = useState(false)
    const [gobletSquatShow, setGobletSquatShow] = useState(false)

    

    const navigate = useNavigate()


    useEffect(()=>{
        const getData = JSON.parse(localStorage.getItem('userData'))
        if(getData){
            console.log("Access granted")
        }else{
            navigate('/')
        }
    })


    const handleGoToBicepCurl = async() =>{
        
        try {
            const chooseExercise = {
                exercise: "bicep_curl"
            }
            const res = await axios.post('http://127.0.0.1:5000/choose_exercise', {
                chooseExercise
            })
            navigate('/exercise')
            console.log(res)
        } catch (error) {
            console.log("Error")
        }

        
        
    }

    const handleGoToGobletSquat = async() =>{
        try {
            const chooseExercise = {
                exercise: "gobletSquat"
            }
            const res = await axios.post('http://127.0.0.1:5000/choose_exercise', {
                chooseExercise
            })
            navigate('/exercise')
            console.log(res)
        } catch (error) {
            console.log("Error")
        }

    }



    return (
        <>
            <div className='w-full h-screen bg-[#F1F1F1]'>
                <div className='pt-2 pl-3'>
                    <img src={logo} alt="logo" className='w-24' />
                </div>
                <div className='flex justify-center'>
                    <Typography className='poppins-bold text-8xl w-[34.5rem]'>Select your Exercise.</Typography>
                </div>
                <div className="flex mt-24 text justify-center gap-x-32">
                    <div className='w-96 h-40 bg-[#94C9D8]  rounded-[2rem] outline outline-2 cursor-pointer' onClick={() => setBicepCurlShow(true)}>
                        <Typography className='poppins-bold text-6xl w-full h-full text-center pt-10'>Bicep Curl</Typography>
                    </div>
                    <div className='w-96 h-40 bg-[#F7813C] rounded-[2rem] outline outline-2 cursor-pointer' onClick={() => setGobletSquatShow(true)}>
                        <Typography className='poppins-bold text-6xl w-full h-full text-center pt-5'>Goblet Squat</Typography>
                    </div>
                </div>
            </div>

            {bicepCurlShow && (
                <div className='absolute top-0 bg-[#88C4D6] w-full h-screen'>
                    <div className='flex justify-between mt-5'>
                        <Typography className='poppins-bold text-9xl text-[#040246] drop-shadow-[0_10px_1px_rgba(0,0,0,0.2)] ml-20'>Bicep Curl</Typography>
                        <FontAwesomeIcon icon={faX} style={{color: "#D9D9D9",}} size='2xl' className='mr-20 cursor-pointer' onClick={() => setBicepCurlShow(false)} />
                    </div>
                    <div className='flex justify-between'>
                        <div className='ml-48 mt-3'>
                            <img src={bicepcurlGIF} alt="" className=' w-[28rem]' />
                        </div>
                        <div className=' mr-[3rem] mt-10 w-[40rem]'>
                            <Typography className='poppins-bold text-white text-5xl drop-shadow-[0_5px_1px_rgba(0,0,0,0.3)] '>Instructions</Typography><br />
                            <hr className='border-4 rounded-full' />
                            <Typography className='poppins-regular text-justify mt-3'>The dumbbell curl is a classic and effective exercise specifically designed to target and strengthen the biceps brachii muscles of the upper arm. To perform a dumbbell curl, an individual typically begins by standing or sitting with a dumbbell in each hand, arms fully extended at the sides, and palms facing forward. The movement involves curling the weights upwards towards the shoulders by bending the elbows while keeping the upper arms stationary. This action engages the biceps, allowing them to contract and lift the weight.</Typography>
                        </div>
                    </div>
                    <div className='w-full h-[5.4rem] flex justify-center'>
                        <Button className='w-[30rem] h-full poppins-bold bg-[#1C2D58] text-3xl rounded-full' size='lg' onClick={handleGoToBicepCurl}>Start exercise</Button>
                    </div>
                </div>
            )}

            {gobletSquatShow &&(
                <div className='absolute top-0 bg-[#E2AC21] w-full h-screen'>
                    <div className='flex justify-between mt-5'>
                        <Typography className='poppins-bold text-8xl text-[#4E3300] drop-shadow-[0_10px_1px_rgba(0,0,0,0.2)] ml-20'>Goblet Squat</Typography>
                        <FontAwesomeIcon icon={faX} style={{color: "#D9D9D9",}} size='2xl' className='mr-20 cursor-pointer' onClick={() => setGobletSquatShow(false)} />
                    </div>
                    <div className='flex justify-between'>
                        <div className='ml-48 mt-3'>
                            <img src={gobletSquatGIF} alt="" className=' w-[28rem]' />
                        </div>
                        <div className=' mr-[3rem] mt-10 w-[40rem]'>
                            <Typography className='poppins-bold text-white text-5xl drop-shadow-[0_5px_1px_rgba(0,0,0,0.3)] '>Instructions</Typography><br />
                            <hr className='border-4 rounded-full' />
                            <Typography className='poppins-regular text-justify mt-3'>The goblet squat is a versatile and highly effective lower-body exercise that targets the quadriceps, glutes, hamstrings, and core muscles. This exercise is performed by holding a single weight, such as a kettlebell or a dumbbell, close to the chest with both hands. The weight is held vertically, resembling the shape of a goblet, with the palms cupping the top end of the weight and the elbows pointing down.</Typography>
                        </div>
                    </div>
                    <div className='w-full h-[5.4rem] mt-8 flex justify-center '>
                        <Button className='w-[30rem] h-full poppins-bold bg-[#4E3300] text-3xl rounded-full' size='lg' onClick={handleGoToGobletSquat}>Start exercise</Button>
                    </div>
                </div>
            )}






        </>
      )
}

export default SelectExercise
