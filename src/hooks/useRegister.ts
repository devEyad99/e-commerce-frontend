//..
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { actAuthRegister, resetUI } from '../store/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, signUpType } from '../validations/signUpScheme';
import useCheckEmailAvailability from '../hooks/useCheckEmailAvailability';
import { useEffect } from 'react';

export const useRegister = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors },
  } = useForm<signUpType>({
    mode: 'onBlur',
    resolver: zodResolver(signUpSchema),
  });

  const {
    checkEmailAvailability,
    emailAvailabilityStauts,
    enterEmail,
    resetCheckEmailAvaailability,
  } = useCheckEmailAvailability();

  const submitForm: SubmitHandler<signUpType> = (data) => {
    const { firstName, lastName, email, password } = data;
    dispatch(actAuthRegister({ firstName, lastName, email, password }))
      .unwrap()
      .then(() => {
        navigate('/login?message=account_created');
      });
  };

  const emialOnBlurHandler = async (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    await trigger('email');
    const value = event.target.value;
    const { isDirty, invalid } = getFieldState('email');
    if (isDirty && !invalid && enterEmail !== value) {
      checkEmailAvailability(value);
    }

    if (isDirty && invalid && enterEmail) {
      resetCheckEmailAvaailability();
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);
  return {
    register,
    handleSubmit,
    submitForm,
    emialOnBlurHandler,
    emailAvailabilityStauts,
    loading,
    error,
    accessToken,
    errors,
  };
};
