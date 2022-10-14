import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import Splash from "../Components/Splash";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  const [splash, setSplash] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 2250);
  }, []);
  return (
    <>
      {splash ? (
        <Splash />
      ) : (
        <SessionProvider session={pageProps.session}>
          <RecoilRoot>
            <Component {...pageProps} />
          </RecoilRoot>
        </SessionProvider>
      )}
    </>
  );
}

export default MyApp;
