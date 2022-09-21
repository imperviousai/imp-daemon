export default function ComingSoon() {
  return (
    <>
      <div className="min-h-full pt-16 pb-12 flex flex-col">
        <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-shrink-0 flex justify-center">
            {/* <a href="/" className="inline-flex"> */}
            {/* <span className="sr-only">Impervious</span>
              <img
                className="h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                alt=""
              /> */}
            {/* </a> */}
          </div>
          <div className="py-16">
            <div className="text-center">
              <p className="text-sm font-semibold text-red-600 uppercase tracking-wide">
                Stay Tuned
              </p>
              <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                Coming Soon.
              </h1>
              <p className="mt-2 text-base text-gray-500">
                Trust us, we are excited about it too. We are working on it and
                it will be released soon.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
