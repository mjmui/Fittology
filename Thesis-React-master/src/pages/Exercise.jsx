import React, {useEffect, useState} from 'react'
import logo from "../assets/Logo.png"
import bicepCurl from "../gif/bicep-curl.gif"
import gobletSquat from "../gif/goblet-squat.gif"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from '@material-tailwind/react'
import axios from 'axios'


const Exercise = () => {
    
    const navigate = useNavigate()
    const [showTutorial, setShowTutorial] = useState(false)
    const [getExercises, setGetExercises] = useState("")
    const [getGIFexercises, setGetGIFexercises] = useState("")
    const [correctionBicep, setCorrectionBicep] = useState("")
    const [liveFeedbackBicep, setLiveFeedbackBicep] = useState("")

    const showPopupTutorial = () =>{
        if (showTutorial == false){
            setShowTutorial(true)
        }
        else{
            setShowTutorial(false)
        }
    }

    const handleBack = async() =>{
        try {
            const res = await axios.post('http://127.0.0.1:5000/back_exercise')
            //console.log(res)
            navigate('/select_exercise')
        } catch (error) {
            console.log("Error deleting exercise")
        }

    }

    useEffect(()=>{
        
        const getData = JSON.parse(localStorage.getItem('userData'))
        if(getData){
            //console.log("Access granted")
        }else{
            navigate('/')
        }

        const getExercise = async() =>{
            const res = await axios.post('http://127.0.0.1:5000/exercise_choosed')
            .catch((error)=>{
                console.log("error")
            })
            //console.log(res.data.exercise.exercise)
            if (res.data.exercise.exercise == "bicep_curl"){
                setGetExercises("Bicep Curl")
                setGetGIFexercises(bicepCurl)
            }else{
                setGetExercises("Goblet Squat")
                setGetGIFexercises(gobletSquat)
            }
        }

        const correctBicep = async() =>{
           try {
            const res = await axios.post('http://127.0.0.1:5000/correct_bicep')
            console.log(res)
            setCorrectionBicep(res.data[0].Correct)
            setLiveFeedbackBicep(res.data[1].livefeedback)

            if (res.data[2].goResult == true){
                navigate('/result')
            }

           } catch (error) {
            console.log("Error in correct Bicep")
           }
            
        }

        correctBicep()
        const intervalId = setInterval(correctBicep, 1000);
        getExercise()

        return () => clearInterval(intervalId)
    },[])

    const handleStartExercise = async() =>{
        try {
            const res = await axios.post('http://127.0.0.1:5000/start_exercise',{
                getExercises
            })
            //console.log(res)

        } catch (error) {
            console.log("error getting exercises")
        }
    }



  return (
    <>
    <div className=' bg-gradient-to-t from-[#5A7D94] to-[#1C272E] w-full h-screen'>
        <div className='flex justify-start pt-5 w-full'>
            <img src={logo} alt="" className='w-20 start-0 ml-8' />
            <div className='flex justify-center text-center w-full items-center'>
                <Typography className='text-white poppins-bold text-2xl'>{getExercises}</Typography>
            </div>
        </div>

        <div className='flex justify-center mt-5'>
            <div className='grid grid-cols-2 gap-96 w-full'>
                <div className='w-[60rem] ml-10 h-[31.5rem] bg-[#D9D9D9]'>
                    <img src="http://127.0.0.1:5000/video_feed" alt="" className='w-[57.6rem] mt-3 h-[29.8rem] ml-5'/>
                </div>
                <div className='ml-20 w-[28rem] h-[27rem] bg-[#94C9D8]'>
                    <div className='ml-5 mt-10 text-center'>
                        <Typography className='poppins-bold text-4xl'>Feedback</Typography>
                    </div>
                    <div className='text-center block m-auto mt-10 w-full '>
                    <Typography className='poppins-regular text-md ml-5 mr-5'>{liveFeedbackBicep}</Typography>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex justify-between'>
            <div className='w-[60rem] ml-10 h-10 mt-5 items-center justify-center flex bg-[#14FF00]'>
                <Typography className='poppins-bold text-2xl text-white'>{correctionBicep}</Typography>
            </div>
            <div className='w-[28rem] h-10 right-[3rem] top-[35rem] absolute'>
                <div className='flex justify-center'>
                    <div className='mr-20'>
                        <Button className='bg-[#F7813C] poppins-bold text-xl rounded-full w-40' onClick={handleStartExercise}>START</Button>
                    </div>
                    <div>
                        <Button className='bg-[#F7813C] poppins-bold text-xl rounded-full w-40'>RESTART</Button>
                    </div>
                </div>
                <div className='flex mt-3 justify-center'>
                    <div className='mr-20'>
                        <Button className='bg-[#F7813C] poppins-bold text-xl rounded-full w-40' onClick={showPopupTutorial}>TUTORIAL</Button>
                    </div>
                    <div>
                        <Button className='bg-[#1C272E] poppins-bold text-xl rounded-full w-40' onClick={handleBack} >BACK</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {showTutorial && (
        <>
        <div className='flex'>
            <div className='z-10 bg-[#1C272E] w-[60rem] h-[32.1rem] absolute top-[6.3rem] ml-10'>
                <div className='bg-[#D9D9D9] w-[57.6rem] h-[29.7rem] ml-5 mt-5 flex justify-center items-center'>
                    <img src={getGIFexercises} alt="" />
                </div>
            </div>
        </div>
        </>
    )}



    </>
  )
}

export default Exercise
