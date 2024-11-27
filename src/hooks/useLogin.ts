//..
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { actAuthLogin, resetUI } from '../store/auth/authSlice';
import { signInSchema, signInType } from '../validations/signInScheme';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';

export const useLogin = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, loading, accessToken } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInType>({
    mode: 'onBlur',
    resolver: zodResolver(signInSchema),
  });

  const submitForm: SubmitHandler<signInType> = (data) => {
    if (searchParams.get('message')) {
      setSearchParams('');
    }
    dispatch(actAuthLogin(data))
      .unwrap()
      .then(() => navigate('/'));
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
    errors,
    error,
    loading,
    accessToken,
    searchParams,
  };
};
