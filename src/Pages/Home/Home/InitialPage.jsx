import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Glogo from '../../../assets/icons/Google.png'
import Flogo from '../../../assets/icons/facebook.png'
import { AuthContext } from '../../../providers/AuthProvider'

export const InitialPage = () => {

    const {googleSignIn, facebookSignIn, user, auth} = useContext(AuthContext)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const adminEmails = ['taufiqhassaan@gmail.com', 'admin2@example.com'];

    const handleGoogleSignIn = async (e) => {
      e.preventDefault();

      setLoading(true); // Set loading state to true during sign-in process

      try {
          // Call the googleSignIn function to sign in with Google
          await googleSignIn();

          const updatedUser = await auth.currentUser;

          // Check if the user is signed in and has an email
          if (updatedUser && updatedUser.email) {
              // If the user is an admin, navigate to '/admin'
              if (adminEmails.includes(updatedUser.email)) {
                  navigate('/admin');
              } else {
                  // If the user is not an admin, navigate to '/home' or show an error message
                  navigate('/home');
              }
           } 
           else {
              // Handle case where user is not signed in or doesn't have an email
              console.error('User is not signed in or does not have an email.');
          }
      } catch (error) {
          console.error('Google sign-in failed:', error);
          // Handle sign-in failure, show error message or retry sign-in
      } finally {
          setLoading(false); // Set loading state to false after sign-in process is complete
      }
  };
    const handleFacebookSignIn = async () => {
        // Call the googleSignIn function from AuthContext
        await facebookSignIn();
    
        // After successful sign-in, navigate to '/home'
        navigate('/home');
      };

  return (
//     <div>
//     <Link to="/">
//    <div className=' flex justify-center mt-32'>
//       <img src="https://i.ibb.co/KyDVTmD/logo.png" alt="" className=' w-52' />
//    </div>
//    </Link>
//    <div className='mt-28 text-center'>
//       <h2 className='text-2xl mb-6 font-bold'>Login With</h2>
//       <div onClick={handleFacebookSignIn} className="flex justify-center gap-12 w-96 ml-[570px] btn bg-pink-50 mb-6"
// >
//           <img src={Flogo} alt="" className='w-8 bg-primary' />
//           <h3 className='text-lg'>Continue With Facebook</h3>
//       </div>
//       <button onClick={handleGoogleSignIn} className="flex justify-center gap-12 w-96 ml-[570px] btn bg-pink-50"
// >
//           <img src={Glogo} alt="" className='w-8' />
//           <h3 className='text-lg'>Continue With Google</h3>
//       </button>
//    </div>
//   </div>
<div className='flex flex-col items-center mt-52'>
  <Link to="/" className='mb-10'>
    <img src="https://i.ibb.co/KyDVTmD/logo.png" alt="" className='w-52' />
  </Link>
  <div className='text-center'>
    <h2 className='text-2xl mb-6 font-bold'>Login With</h2>
    <div onClick={handleFacebookSignIn} className="flex justify-center items-center gap-4 w-full max-w-lg btn bg-pink-50 mb-6">
      <img src={Flogo} alt="" className='w-8 bg-primary' />
      <h3 className='text-lg'>Continue With Facebook</h3>
    </div>
    <button onClick={handleGoogleSignIn} className="flex justify-center items-center gap-4 w-full max-w-lg btn bg-pink-50">
      <img src={Glogo} alt="" className='w-8' />
      <h3 className='text-lg'>Continue With Google</h3>
    </button>
  </div>
</div>

  )
}
