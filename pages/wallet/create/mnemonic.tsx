import Link from "next/link";
import { useRouter } from "next/router";
import React, { MouseEvent, useEffect, useState } from "react";
import { createMnemonic } from "@/utils/wallet";

import { useStep } from "@/hooks/step";
import { PenOnLineIcon, ReloadIcon } from "@/components/icons/accessibility";
import Notification, { useNotification } from "@/components/notification";
import BackButton from "@/components/button/back";

export default function MnemonicCreateWallet() {
  const [step] = useStep(3);
  const [words, setWords] = useState<string[]>(new Array(12).fill(""));
  const [success, setSuccess] = useState(false);

  function generateWords(): string[] {
    //create 12 ramdom words
    const mnemonics = createMnemonic();
    return mnemonics;
  }
  function generateAndSetWords() {
    setWords(generateWords());
  }

  useEffect(generateAndSetWords, []);

  return (
    <div className="flex flex-col">
      <div className="py-2 px-4 sticky top-0 z-20 border-b border-neutral-300 bg-white">
        <h1 className="text-base text-center font-medium relative">
          <BackButton />
          Create With Mnemonic
        </h1>
      </div>
      {step === 1 && (
        <_1 words={words} generateAndSetWords={generateAndSetWords} />
      )}
      {step === 2 && <_2 words={words} setSuccess={setSuccess} />}
      {step === 3 && <_3 />}
    </div>
  );
}

function _1({
  words,
  generateAndSetWords,
}: {
  words: string[];
  generateAndSetWords: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-base">
        <span className="mr-2">Step 1:</span>
        <span>Write down these words</span>
      </h2>
      <div className="w-full flex justify-end">
        <button
          onClick={generateAndSetWords}
          className="flex items-center font-semibold text-blue-600"
        >
          <span className="flex mr-1 w-6 h-6">
            <ReloadIcon />
          </span>
          <span>Regenerate</span>
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 justify-center">
        {words.map((e, i) => (
          <span
            key={i}
            className="inline-flex items-center justify-center rounded-md h-9 bg-cyan-100 relative px-4"
          >
            {e}
            <span className="absolute inline-flex items-center justify-center w-5 h-5 top-0 left-0 text-blue-600 text-[0.625rem] font-semibold">
              {i + 1}
            </span>
          </span>
        ))}
      </div>

      <Link
        href="?step=2"
        shallow={true}
        className="p-2 bg-blue-600 rounded-lg text-white text-center font-semibold shadow-md shadow-blue-200"
      >
        Next
      </Link>
    </div>
  );
}

function _2({
  words: _words,
  setSuccess,
}: {
  words: string[];
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [words, setWords] = useState<string[]>(
    JSON.parse(JSON.stringify(_words)).sort()
  );
  const [selectedWords, setSelectedWords] = useState(
    new Array(12).fill("").map((e, i) => [e, i])
  );
  const router = useRouter();
  const [notification, pushNotification] = useNotification();

  function addToSelectedWords(e: string, i: number) {
    setSelectedWords((prev) => {
      let done = false;
      return prev.map((ee) => {
        if (ee[0] == "" && e != "" && !done) {
          done = true;
          removeFromWords(i);
          return [e, i];
        } else return ee;
      });
    });
  }

  function clearSelectedWords() {
    setSelectedWords(new Array(12).fill("").map((e, i) => [e, i]));
    setWords(JSON.parse(JSON.stringify(_words)).sort());
  }

  function removeFromWords(i: number) {
    setWords((prev) => {
      let n = JSON.parse(JSON.stringify(prev));
      n[i] = "";
      return n;
    });
  }

  function removeFromSelectedWords(i: number) {
    const $selectedWords = JSON.parse(JSON.stringify(selectedWords));
    if ($selectedWords[i][0] == "") return;

    setWords((prev) => {
      let tt = prev.slice();
      tt[$selectedWords[i][1]] = $selectedWords[i][0];
      return tt;
    });
    setSelectedWords((prev) => {
      let t = prev.slice();
      t[i][0] = "";
      return t;
    });
  }

  function validateSelectedAndContinue(ev: MouseEvent) {
    ev.preventDefault();
    if (selectedWords.every((e, i) => e[0] === _words[i])) {
      setSuccess(true);
      router.replace("?step=3", undefined, { shallow: true });
    } else {
      pushNotification({
        element: (
          <p style={{ textAlign: "center" }}>
            The order of words are incorrect
          </p>
        ),
        type: "error",
      });
      clearSelectedWords();
    }
  }

  useEffect(() => {
    setWords(JSON.parse(JSON.stringify(_words)).sort());
  }, [_words]);

  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-base">
        <span className="mr-2">Step 2:</span>
        <span className="mr-2">Verification</span>
      </h2>
      <div className="w-full flex flex-col gap-4 justify-center">
        <div className="w-full flex justify-end">
          <button className="flex items-center font-semibold text-blue-600">
            <span className="flex mr-1 w-6 h-6">
              <PenOnLineIcon />
            </span>
            <span>Clear</span>
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 justify-center">
          {selectedWords.map((e, i) => (
            <button
              key={i}
              className={`inline-flex items-center justify-center rounded-md h-9 relative px-4 ${
                e[0] !== "" && e[0] !== _words[i]
                  ? "border border-red-300 bg-red-100"
                  : "bg-cyan-100"
              }`}
              onClick={() => {
                removeFromSelectedWords(i);
              }}
            >
              <span className="absolute inline-flex items-center justify-center w-5 h-5 top-0 left-0 text-blue-600 text-[0.625rem] font-semibold">
                {i + 1}
              </span>
              {e[0]}
            </button>
          ))}
        </div>

        <h3 className="text-center text-base">
          Click the words in the correct order
        </h3>
        <div className="grid grid-cols-3 gap-4 justify-center">
          {words.map((e: string, i: number) => (
            <button
              key={i}
              className={`inline-flex items-center justify-center rounded-md h-9 relative px-4 bg-transparent text-blue-600 transition`}
              onClick={() => {
                if (e !== "") addToSelectedWords(e, i);
              }}
              tabIndex={e === "" ? -1 : 0}
              style={{ cursor: e === "" ? "default" : "pointer" }}
            >
              {e}
            </button>
          ))}
        </div>

        <Link
          href="?step=3"
          shallow={true}
          className="p-2 bg-blue-600 rounded-lg text-white text-center font-semibold shadow-md shadow-blue-200"
          onClick={(e) => validateSelectedAndContinue(e)}
        >
          Next
        </Link>
      </div>
      <Notification
        notification={notification}
        pushNotification={pushNotification}
      />
    </div>
  );
}

function _3() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-base">
        <span className="mr-2">Step 3:</span>
        <span className="mr-2">Congratulations</span>
      </h2>
      <p className="text-neutral-800">
        You are now ready to take advantage of all that Mola Digital has to
        offer!
      </p>
      <Link
        href="/wallet/access/mnemonic"
        className="w-full flex py-2 px-6 bg-blue-600 rounded-lg shadow-md shadow-blue-200 justify-center items-center text-center font-semibold text-white"
      >
        Access Wallet
      </Link>
    </div>
  );
}