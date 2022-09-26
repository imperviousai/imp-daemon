import { createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";

import awsmobile from "../aws-exports";
import { useAtom } from "jotai";
import { auth0TokenAtom } from "../stores/auth";

const ApolloWrapper = ({ children }) => {
  const [auth0Token] = useAtom(auth0TokenAtom);
  const fetchToken = async () => {
    return auth0Token;
  };

  const url = awsmobile.aws_appsync_graphqlEndpoint;
  const region = awsmobile.aws_appsync_region;
  const auth = {
    type: awsmobile.aws_appsync_authenticationType,
    jwtToken: () => fetchToken(),
  };

  const httpLink = new HttpLink({ uri: url });

  const link = ApolloLink.from([
    createAuthLink({ url, region, auth }),
    createSubscriptionHandshakeLink({ url, region, auth }, httpLink),
  ]);

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
