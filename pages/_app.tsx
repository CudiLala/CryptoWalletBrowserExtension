import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ProviderContextComponent } from "context/web3";
import { SocketProviderContextComponent } from "context/web3/socket";
import { AssetProviderContextComponent } from "context/web3/assets";
import { AcoountContextComponent } from "context/account";
import LoaderContextComponent from "context/loader";
import { useEffect } from "react";
import { initAssetEngine } from "utils/assetEngine";
import { NetworkContextComponent } from "@/context/network";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await initAssetEngine();
    })();
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div className="relative w-[22rem] h-[36rem] overflow-auto c-scroll">
        <LoaderContextComponent>
          <NetworkContextComponent>
            <ProviderContextComponent>
              <SocketProviderContextComponent>
                <AcoountContextComponent>
                  <AssetProviderContextComponent>
                    <Head>
                      <title>Mola Wallet</title>
                    </Head>
                    <Component {...pageProps} />
                  </AssetProviderContextComponent>
                </AcoountContextComponent>
              </SocketProviderContextComponent>
            </ProviderContextComponent>
          </NetworkContextComponent>
        </LoaderContextComponent>
      </div>
    </div>
  );
}
