import './Confirmation.css';
import { useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';

function Confirmation() {
  useEffect(() => {
    async function handleConfirmation() {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (token) {
        const { data, error } = await supabase.auth.verifyOtp({ token });
        if (error) {
          console.error('Error during email verification:', error.message);
        } else {
          console.log('Email verified, user logged in:', data);
        }
      } else {
        console.log('No token found in URL');
      }
    }

    handleConfirmation();
  }, []);

  return (
    <main>
      <h1>Verifying your email...</h1>
    </main>
  );
}

export default Confirmation;
