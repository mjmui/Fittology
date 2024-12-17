import React, {useState} from 'react'
import logo from '../assets/Logo.png'
import { Input, Typography, Button, Radio } from '@material-tailwind/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'




import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {


    const [fullname, setFullname] = useState('')
    const [age, setAge] = useState(1)
    const [injury1, setInjury1] = useState("")
    const [injury2, setInjury2] = useState("")
    const [failed, setFailed] = useState("")
    const [ageLearnMore, setAgeLearnMore] = useState("")
    const [showMsgInjury, setShowMsgInjury] = useState("")
    const [injuryMsgShow, setInjuryMsgShow] = useState("")

    const [showLearnMore, setShowLearnMore] = useState(false)
    const [showInjuryMore, setShowInjuryMore] = useState(false)

  
  
    const navigate = useNavigate()
  
    const registerUser = async(e) =>{
      e.preventDefault();
     try {
      const resp = await axios.post("http://127.0.0.1:5000/register",{
        fullname,
        age,
        injury1,
        injury2
      })
      console.log(resp)
  
      if (resp.data.success == "success"){
        localStorage.setItem('userData', JSON.stringify(fullname))
        navigate('/select_exercise')
      }else if(resp.data[0].injury == "Injuries are not allowed. "){
        setShowMsgInjury(resp.data[0].injury)
        setInjuryMsgShow(resp.data[1].more)
      }
      else{
        setFailed(resp.data[0].failed)
        setAgeLearnMore(resp.data[1].more)
      }
  
     } catch (error) {
      console.log(error)
     }
    }


  
  
    return (
      <>
        <div className='w-full h-full bg-black bg-gradient-to-tl from-[#F7813C] to-[#FFE6D7]'>
          <div className='pt-2 pl-3'>
            <img src={logo} alt="logo" className=' w-24' />
          </div>
          <div className='pr-20'>
            <h1 className='poppins-bold text-9xl text-[#1C272E] text-end'>Register.</h1>
          </div>
          <div className='w-full bg-white rounded-tl-[15rem] pt-20'>
            <form onSubmit={registerUser}>
              <div className='grid grid-cols-2 gap-4 place-content-between h-48 ml-[20rem] items-center'>
                <div className='w-96 '>
                <Input size="lg" label="Fullname" className='' value={fullname} onChange={(e)=>setFullname(e.target.value)} required/>
                </div>
                <div>
                  <h1 className=' text-red-900 font-bold'>{showMsgInjury}<span className=' underline cursor-pointer' onClick={()=>setShowInjuryMore(true)} >{injuryMsgShow}</span></h1>
                  <h2 className='poppins-medium text-xl mt-2'>Do you have injury? </h2>
                  <Radio name='injury1' label={<Typography>Yes</Typography>} value="yes" onChange={(e)=>setInjury1(e.target.value)} required/>
                  <Radio name='injury1' label={<Typography>No</Typography>} value="no" onChange={(e)=>setInjury1(e.target.value)} required/>
                </div>
                <div className='w-96'>
                  <Input size="lg" label="Age" className='' color='orange' type='number' value={age} onChange={(e)=>setAge(e.target.value)} required />
                  <h1 className=' text-red-900 font-bold'>{failed}<span className=' underline cursor-pointer' onClick={()=>setShowLearnMore(true)} >{ageLearnMore}</span></h1>
                </div>
                <div>
                  <h2 className='poppins-medium text-xl mt-2 w-96'>Do you have any underlying health conditions? </h2>
                  <Radio name='injury2' label={<Typography>Yes</Typography>} value="yes" onChange={(e)=>setInjury2(e.target.value)} required/>
                  <Radio name='injury2' label={<Typography>No</Typography>} value="no" onChange={(e)=>setInjury2(e.target.value)} required/>
                </div>
              </div>
  
              <div className='mt-10 flex justify-center'>
                <Button type='submit' className='bg-[#94C9D8] text-black w-40 h-12 rounded-full poppins-bold text-md'>Enter</Button>
              </div>
  
            </form>
          </div>
  
        </div>

        {showInjuryMore && (
          <div className='absolute top-0 bg-[#F1F1F1] w-full h-screen'>
            <div className='flex mt-5 justify-end'>
              <img src={logo} alt="" className='block m-auto'/>
              <FontAwesomeIcon icon={faX} size="xl" style={{color: "#7B7B7B",}} className='cursor-pointer mr-5 ' onClick={() => setShowInjuryMore(false)}/>
            </div>
            <div className='text-center mt-10'>
              <Typography className='text-2xl poppins-medium'>Health Advisory Notice</Typography>
            </div>
            <div className='block m-auto w-[45rem] text-center mt-10'>
              <Typography className='poppins-bold text-3xl'>health comes first! We’re sad you can’t join us. Take care and come back soon!</Typography>
            </div>
            <div className='text-center block m-auto mt-10 w-[50rem]'>
              <Typography className='poppins-regular text-md'>Thank you for providing your personal information. Due to health concerns you have declared, we regret to inform you that we are currently unable to allow you to proceed with accessing our website. Your health and safety are our top priorities. Please consult with a healthcare professional for further guidance. If you have any questions or need assistance, please contact our support team.</Typography>
            </div>
            <div className='mt-10 text-center'>
              <Typography className='poppins-bold text-lg'>Thank you for understanding!</Typography>
            </div>
          </div>
        )}

        {showLearnMore && (
          <div className='absolute top-0 bg-[#F1F1F1] w-full h-screen'>
            <div className='flex mt-5 justify-end'>
              <img src={logo} alt="" className='block m-auto'/>
              <FontAwesomeIcon icon={faX} size="xl" style={{color: "#7B7B7B",}} className='cursor-pointer mr-5 ' onClick={() => setShowLearnMore(false)}/>
            </div>
            <div className='text-center mt-10'>
              <Typography className='text-2xl poppins-medium'>Age Restriction Notice</Typography>
            </div>
            <div className='block m-auto w-[45rem] text-center mt-10'>
              <Typography className='poppins-bold text-3xl'>Aww, You’re not fit yet in our age group. We'll save you a spot for later!</Typography>
            </div>
            <div className='text-center block m-auto mt-10 w-[50rem]'>
              <Typography className='poppins-regular text-md'>Thank you for providing your personal information. Even though we would like you to try our website is only accessible to individuals aged 14 to 60. Based on the age information you have provided, we regret to inform you that we are unable to allow you to proceed. If you have any questions or need further assistance, please contact our support team.</Typography>
            </div>
            <div className='mt-10 text-center'>
              <Typography className='poppins-bold text-lg'>Thank you for understanding!</Typography>
            </div>
          </div>
        )}
  
  
  
  
      </>
    )
  
}

export default Register
