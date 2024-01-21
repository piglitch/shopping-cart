import React from "react";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div id="error-page" className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-500 mb-4">
        Oops! This route does not exist.
      </h1>
      <p className="text-gray-600">
        It seems like you've wandered into uncharted territory. The page you're
        looking for might have been moved or doesn't exist.
      </p>
      <div className="mt-8">
        <i className="text-lg text-gray-700">
          Error Details: <strong>{error.status}</strong> {error.statusText}
        </i>
        {error.message && (
          <p className="text-sm text-gray-700">{error.message}</p>
        )}
      </div>
      <Link to="/" className="mt-6 text-blue-500 hover:underline">
        Go back to the home page
      </Link>
    </div>
  );
};

export default ErrorPage;
