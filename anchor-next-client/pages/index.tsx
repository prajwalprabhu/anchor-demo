// export default Home;
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Keypair } from "@solana/web3.js";
import { NextPage } from "next";
import React, { useState } from "react";
import * as anchor from "@project-serum/anchor";
import Redirect from "../components/Redirect";

import Footer from "../components/Footer";
let local_account: Keypair;
import {
  Decrement,
  fetch_data,
  Increment,
  Init,
  Set,
} from "../utils/solana_instruction_helper_functions";

const Styles = {
  button:
    "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full w-48 ml-[10%]",
  container: "ml-10 grid justify-center justify",
  h1: "text-2xl text-blue-900   p-3 ml-[8%]",
  h12: "justify-center py-3 pl-5 text-blue-700 ml-[10%] border border-blue-400 w-48 mb-2",
};
const Home: NextPage = () => {
  const [counter, setCounter] = useState(0);
  const wallet = useAnchorWallet();
  if (!wallet) {
    return <Redirect to="/connect" />;
  }
  local_account = anchor.web3.Keypair.fromSeed(wallet.publicKey.toBuffer());

  fetch_data(wallet, local_account).then((val) => {
    if (val) {
      setCounter(val.counter);
    }
  });

  return (
    <>
      <div className={Styles.container}>
        <h1 className={Styles.h1}>Solana Blockchain app </h1>
        <h3>Anchor framework (rust) + nextjs(TS) + Phantom Wallet</h3>
        <h1 className={Styles.h12}>
          Couter : <span className="text-blue-900 ">{counter}</span>
        </h1>
        <button
          className={Styles.button}
          onClick={() => {
            Init(wallet, setCounter, local_account).then(() =>
              alert("Transaction successfull")
            );
          }}
        >
          Init
        </button>
        <button
          className={Styles.button}
          onClick={() => {
            Increment(wallet, setCounter, local_account).then(() =>
              alert("Transaction successfull")
            );
          }}
        >
          Incriment
        </button>{" "}
        <button
          className={Styles.button}
          onClick={() => {
            Decrement(wallet, setCounter, local_account).then(() =>
              alert("Transaction successfull")
            );
          }}
        >
          Deccriment
        </button>{" "}
        <button
          className={Styles.button}
          onClick={() => {
            Set(wallet, setCounter, local_account).then(() =>
              alert("Transaction successfull")
            );
          }}
        >
          Set +100
        </button>
        <Footer />
      </div>
    </>
  );
};
export default Home;
