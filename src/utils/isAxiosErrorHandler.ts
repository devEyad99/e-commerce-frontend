//..
import { isAxiosError } from 'axios';

const isAxiosErrorHandler = (error: unknown) => {
  if (isAxiosError(error)) {
    return error.response?.data;
  } else {
    return 'unknown error';
  }
};
console.log('isAxiosErrorHandler loaded');
export default isAxiosErrorHandler;
