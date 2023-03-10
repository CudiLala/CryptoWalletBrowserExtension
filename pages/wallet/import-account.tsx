import { ArrowDown } from "@/components/icons/arrows";
import { useContext, useRef } from "react";
import { CloseIcon } from "@/components/icons/accessibility";
import { useRouter } from "next/router";
import {
  encyrptWithLockAndStoreWallet,
  generateWalletUsingPKey,
} from "@/utils/wallet";
import { LoaderContext } from "@/context/loader";
import WalletHeader from "@/page_components/wallet/header";

export default function ImportAccountPage() {
  const PKRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [startLoader, stopLoader] = useContext(LoaderContext);

  async function handlePKFormSubmit(e: any, privateKey: string) {
    e.preventDefault();

    startLoader();
    try {
      const wallet = await generateWalletUsingPKey(privateKey);

      let password = (await chrome.storage.session.get("unlockPassword"))
        .unlockPassword;

      await encyrptWithLockAndStoreWallet(wallet, password);

      router.push("/wallet");
    } catch (error) {
      console.log(error);
      stopLoader();
    }
  }

  return (
    <>
      <WalletHeader />
      <div className="p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-base">Import Wallet</span>
          <button
            className="w-7 h-7 flex"
            onClick={() => router.push("/wallet")}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="p-3 bg-gray-100 rounded-lg text-center">
          Imported accounts will not be associated with your originally created
          Mola account Secret Recovery Phrase. Learn more about imported
          accounts here
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-base">Select Type</p>
          <button className="flex justify-between rounded-lg bg-gray-100 py-2 px-4 items-center">
            <span>Private Key</span>
            <span className="w-4 h-4 flex">
              <ArrowDown />
            </span>
          </button>
        </div>

        <form
          className="flex flex-col gap-4 py-4"
          onSubmit={async (e) =>
            await handlePKFormSubmit(e, PKRef.current!.value)
          }
        >
          <div className="flex flex-col">
            <label className="mb-px">Enter your private key</label>
            <input
              ref={PKRef}
              type="password"
              className="border border-neutral-400 p-2 rounded-lg focus:outline-none focus:ring-2 ring-offset-1 ring-blue-500 tracking-wider transition"
              required
              autoFocus={true}
            />
          </div>

          <button
            type="submit"
            className="p-2 bg-blue-700 rounded-lg text-white font-semibold shadow-md shadow-blue-200"
          >
            Import
          </button>
        </form>
      </div>
    </>
  );
}
