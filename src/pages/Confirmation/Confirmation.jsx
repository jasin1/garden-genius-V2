import './Confirmation.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../config/supabaseClient';

function Confirmation(){
  const navigate = useNavigate();

  useEffect(()=>{
    async function handleConfirmation() {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      const redirectTo = urlParams.get('redirect_to');

      if(token){
        const { data, error } = await supabase.auth.verifyOtp({token});
        if(error){
          console.error('Error during email verification: ', error.message);
          navigate('/login');
        }else{
          console.log('Email verified, user logged in: ', data);
        }

        if(redirectTo){
          navigate(redirectTo);
        }

      }else{
        console.log('No token found in URL');
        navigate('/login');
      }     
    }

    handleConfirmation();

  },[navigate]);

  return(
    <main>
      <h1>Please check your email to confirm your account</h1>
    </main>
  )

}

export default Confirmation;