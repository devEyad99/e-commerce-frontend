//..
import axios from 'axios';
import { useState } from 'react';

type TStatus = 'idle' | 'checking' | 'available' | 'notAvailable' | 'failed';

const useCheckEmailAvailability = () => {
  const [emailAvailabilityStauts, setEmailAvailabilityStauts] =
    useState<TStatus>('idle');
  const [enterEmail, setEnterEmail] = useState<null | string>(null);

  const checkEmailAvailability = async (email: string) => {
    setEnterEmail(email);
    setEmailAvailabilityStauts('checking');
    try {
      const response = await axios.get(`/users/?email=${email}`);
      if (!response.data.length) {
        setEmailAvailabilityStauts('available');
      } else {
        setEmailAvailabilityStauts('notAvailable');
      }
    } catch (error) {
      setEmailAvailabilityStauts('failed');
    }
  };

  const resetCheckEmailAvaailability = () => {
    setEmailAvailabilityStauts('idle');
    setEnterEmail(null);
  };
  return {
    checkEmailAvailability,
    emailAvailabilityStauts,
    enterEmail,
    resetCheckEmailAvaailability,
  };
};

export default useCheckEmailAvailability;
