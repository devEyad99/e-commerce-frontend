import { Link } from 'react-router-dom';

import { LottieHandler } from '../components/feedback';

export default function Error() {
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* <h1 className="text-4xl font-bold mb-4">{errorStatus}</h1>
      <p className="text-lg mb-8">{errorStatusText}</p> */}
      {/* <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8">Sorry, the page you are looking for does not exist.</p> */}
     
      <LottieHandler type="notFound"/>
      <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        Go to Home
      </Link>
    </div>
  );
};
