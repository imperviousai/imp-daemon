import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Auth from "../components/Auth";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/ErrorFallback";

import "../styles.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const queryClient = new QueryClient();

// need to disable SSR since we don't need it. building a client side SPA extension
const SafeHydrate = ({ children }) => {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SafeHydrate>
        <QueryClientProvider client={queryClient}>
          <ToastContainer />
          <Auth>
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onReset={() => console.log("resetting")}
            >
              <Component {...pageProps} />
            </ErrorBoundary>
          </Auth>
          <ReactQueryDevtools initialIsOpen={false} position="top-left" />
        </QueryClientProvider>
      </SafeHydrate>
    </>
  );
}

export default MyApp;
