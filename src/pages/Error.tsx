import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom';

export default function Error() {
  const error = useRouteError();
  let errorStatus: number;
  let errorStatusText: string;

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorStatusText = error.statusText;
  } else {
    errorStatus = 404;
    errorStatusText = "Page Not Found";
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">{errorStatus}</h1>
      <p className="text-lg mb-8">{errorStatusText}</p>
      {/* <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8">Sorry, the page you are looking for does not exist.</p> */}
     
      <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        Go to Home
      </Link>
    </div>
  );
};
