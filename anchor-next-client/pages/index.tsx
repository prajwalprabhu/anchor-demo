// export default Home;
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import {
  AnchorWallet,
  useAnchorWallet,
  useConnection,
  useWallet,
  WalletContextState,
} from "@solana/wallet-adapter-react";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { NextPage } from "next";
import React, { useCallback, useEffect, useState } from "react";
import * as anchor from "@project-serum/anchor";
import Redirect from "../components/Redirect";
import { Program, AnchorProvider } from "@project-serum/anchor";
import ID from "../anchor_demo.json";
const IDL = JSON.parse(JSON.stringify(ID));

// const programId = new anchor.web3.PublicKey(
//   "3SLWpmiJPJbLT4MfnitHHoAZyuayThJMuEmkfMcxeX2o"
// );
const programId = ID.metadata.address;
// const local_account = anchor.web3.Keypair.fromSeed(
//   Buffer.from("qwertyuiopasdfghjklzxcvbnm,.l;/'")
// );
// const local_account = anchor.web3.Keypair.generate();
let local_account: Keypair;
import fs from "fs";
import { BN } from "bn.js";
const Init = async (
  wallet: AnchorWallet,
  setCounter: React.Dispatch<React.SetStateAction<number>>
) => {
  //@ts-ignore
  if (!wallet) {
    return null;
  }

  //  const network = clusterApiUrl("localhost");
  const connection = new Connection("http://localhost:8899");
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
  });
  const program = new anchor.Program(IDL, programId, provider);
  // const my_account = wallet;
  // const local_account = anchor.web3.Keypair.fromSecretKey(
  //   new Uint8Array(secret_key)
  // );
  const tx = await program.methods
    .initialize()
    .accounts({
      myAccount: local_account.publicKey,
      user: provider.wallet.publicKey,
      // user: local_account.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([local_account])
    .rpc();
  console.log(tx);
};

const Increment = async (
  wallet: AnchorWallet,
  setCounter: React.Dispatch<React.SetStateAction<number>>
) => {
  //  const network = clusterApiUrl("localhost");
  const connection = new Connection("http://localhost:8899", "processed");
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
  });
  const program = new anchor.Program(IDL, programId, provider);
  // const my_account = wallet;

  const tx = await program.methods
    .increment()
    .accounts({
      myAccount: local_account.publicKey,
    })
    // .signers([my_account])
    .rpc();
  console.log(tx);
  let data = await program.account.myAccount.fetch(local_account.publicKey);
  setCounter(data.counter);
  console.log(data);
};
const Decrement = async (
  wallet: AnchorWallet,
  setCounter: React.Dispatch<React.SetStateAction<number>>
) => {
  //  const network = clusterApiUrl("localhost");
  const connection = new Connection("http://localhost:8899", "processed");
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
  });
  const program = new anchor.Program(IDL, programId, provider);
  // const my_account = wallet;

  const tx = await program.methods
    .decrement()
    .accounts({
      myAccount: local_account.publicKey,
    })
    // .signers([my_account])
    .rpc();
  console.log(tx);
  let data = await program.account.myAccount.fetch(local_account.publicKey);
  setCounter(data.counter);

  console.log(data);
};
const Set = async (
  wallet: AnchorWallet,
  val: number,
  setCounter: React.Dispatch<React.SetStateAction<number>>
) => {
  //  const network = clusterApiUrl("localhost");
  const connection = new Connection("http://localhost:8899", "processed");
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
  });
  const program = new anchor.Program(IDL, programId, provider);
  // const my_account = wallet;

  const tx = await program.methods
    .set(val)
    .accounts({
      myAccount: local_account.publicKey,
    })
    // .signers([my_account])
    .rpc();
  console.log(tx);
  let data = await program.account.myAccount.fetch(local_account.publicKey);
  setCounter(data.counter);

  console.log(data);
};
const fetch_data = async (wallet: AnchorWallet) => {
  if (!local_account) {
    return;
  }
  const connection = new Connection("http://localhost:8899", "processed");
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
  });
  const program = new anchor.Program(IDL, programId, provider);
  let data = await program.account.myAccount.fetch(local_account.publicKey);
  return data;
};

const Styles = {
  button:
    "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full",
  container: "flex flex-row ",
};
const Home: NextPage = () => {
  const [counter, setCounter] = useState(0);
  const wallet = useAnchorWallet();
  if (!wallet) {
    return <Redirect to="/connect" />;
  }

  fetch_data(wallet).then((val) => {
    if (val) {
      setCounter(val.counter);
    }
  });

  local_account = anchor.web3.Keypair.fromSeed(wallet.publicKey.toBuffer());

  return (
    <div className="justify-center justify-item-center grid ">
      <h1 className=" text-2xl text-blue-900   p-3  m-10">
        Solana Blockchain app{" "}
      </h1>
      <h3>Anchor framework (rust) + nextjs(TS) + Phantom Wallet</h3>
      <div className="h-10 w-48 flex flex-col mt-10 mx-auto my-auto pt-10 justify-items-center">
        <div>
          <h1 className="justify-center p-5 ml-5 mx-auto text-blue-700">
            Couter : <span className="text-blue-900 ">{counter}</span>
          </h1>
        </div>
        <button
          className={Styles.button}
          onClick={() => {
            Init(wallet, setCounter).then(() =>
              alert("Transaction successfull")
            );
          }}
        >
          Init
        </button>
        <button
          className={Styles.button}
          onClick={() => {
            Increment(wallet, setCounter).then(() =>
              alert("Transaction successfull")
            );
          }}
        >
          Incriment
        </button>{" "}
        <button
          className={Styles.button}
          onClick={() => {
            Decrement(wallet, setCounter).then(() =>
              alert("Transaction successfull")
            );
          }}
        >
          Deccriment
        </button>{" "}
        <button
          className={Styles.button}
          onClick={() => {
            Set(wallet, 100, setCounter).then(() =>
              alert("Transaction successfull")
            );
          }}
        >
          Set 100
        </button>
      </div>
    </div>
  );
};
export default Home;
