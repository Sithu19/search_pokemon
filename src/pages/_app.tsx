import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://graphql-pokemon2.vercel.app/",
});

export default function App({ Component, pageProps }: AppProps) {
  return <ApolloProvider client={client}>
    <Component {...pageProps} />
    </ApolloProvider>
}
