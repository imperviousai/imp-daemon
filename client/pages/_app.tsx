import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Auth from "../components/Auth";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/ErrorFallback";
import { Auth0Provider } from "@auth0/auth0-react";
import auth0Config from "../auth0_config.json";
import { Amplify } from "aws-amplify";
import awsExports from "../aws-exports";
import ApolloWrapper from "../components/ApolloWrapper";

import "../styles.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "@algolia/autocomplete-theme-classic";
import "../components/navigation/autocomplete.css";

Amplify.configure(awsExports);

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
  const auth0ProviderConfig = {
    domain: auth0Config.domain,
    clientId: auth0Config.clientId,
    audience: auth0Config.audience,
  };

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
              <Auth0Provider
                {...auth0ProviderConfig}
                cacheLocation="localstorage"
              >
                <ApolloWrapper>
                  <Component {...pageProps} />
                </ApolloWrapper>
              </Auth0Provider>
            </ErrorBoundary>
          </Auth>
          <ReactQueryDevtools initialIsOpen={false} position="top-left" />
        </QueryClientProvider>
      </SafeHydrate>
    </>
  );
}

export default MyApp;
