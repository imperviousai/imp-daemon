// global error boundary wrapper to catch unhandled exceptions
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <>
      <div
        className="bg-white h-full min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8"
        role="alert"
      >
        <div className="max-w-max mx-auto">
          <main className="sm:flex">
            <p className="text-4xl font-extrabold text-primary">Error</p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                  Something went wrong.
                </h1>
                <p className="mt-1 text-base text-gray-500">
                  An unexpected error occured. Let&apos;s try this again.
                </p>
                <p className="mt-1 text-base text-gray-500">
                  {error.message && `Error: ${error.message}`}
                </p>
                <button
                  type="button"
                  onClick={resetErrorBoundary}
                  className="inline-flex items-center px-4 py-2 mt-4 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Try Again
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ErrorFallback;
