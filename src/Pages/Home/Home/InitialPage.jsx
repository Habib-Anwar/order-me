import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Glogo from '../../../assets/icons/Google.png'
import Flogo from '../../../assets/icons/facebook.png'
import { AuthContext } from '../../../providers/AuthProvider'

export const InitialPage = () => {

    const {googleSignIn, facebookSignIn} = useContext(AuthContext)
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        // Call the googleSignIn function from AuthContext
        await googleSignIn();
    
        // After successful sign-in, navigate to '/home'
        navigate('/home');
      };
    const handleFacebookSignIn = async () => {
        // Call the googleSignIn function from AuthContext
        await facebookSignIn();
    
        // After successful sign-in, navigate to '/home'
        navigate('/home');
      };

  return (
    <div>
    <Link to="/">
   <div className=' flex justify-center mt-32'>
      <img src="https://i.ibb.co/KyDVTmD/logo.png" alt="" className=' w-52' />
   </div>
   </Link>
   <div className='mt-28 text-center'>
      <h2 className='text-2xl mb-6 font-bold'>Login With</h2>
      <div onClick={handleFacebookSignIn} className="flex justify-center gap-12 w-96 ml-[570px] btn bg-pink-50 mb-6"
>
          <img src={Flogo} alt="" className='w-8 bg-primary' />
          <h3 className='text-lg'>Continue With Facebook</h3>
      </div>
      <div onClick={handleGoogleSignIn} className="flex justify-center gap-12 w-96 ml-[570px] btn bg-pink-50"
>
          <img src={Glogo} alt="" className='w-8' />
          <h3 className='text-lg'>Continue With Google</h3>
      </div>
   </div>
  </div>
  )
}
