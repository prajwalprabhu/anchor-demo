import { AnchorProvider } from "@project-serum/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { Connection, Keypair } from "@solana/web3.js";
import ID from "../anchor_demo.json";
const IDL = JSON.parse(JSON.stringify(ID));
import * as anchor from "@project-serum/anchor";

const programId = ID.metadata.address;

export const Init = async (
  wallet: AnchorWallet,
  setCounter: React.Dispatch<React.SetStateAction<number>>,
  local_account: Keypair
) => {
  if (!wallet) {
    return null;
  }

  const connection = new Connection("http://localhost:8899");
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
  });
  const program = new anchor.Program(IDL, programId, provider);
  const tx = await program.methods
    .initialize()
    .accounts({
      myAccount: local_account.publicKey,
      user: provider.wallet.publicKey,

      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([local_account])
    .rpc();
  console.log(tx);
};

export const Increment = async (
  wallet: AnchorWallet,
  setCounter: React.Dispatch<React.SetStateAction<number>>,
  local_account: Keypair
) => {
  const connection = new Connection("http://localhost:8899", "processed");
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
  });
  const program = new anchor.Program(IDL, programId, provider);

  const tx = await program.methods
    .increment()
    .accounts({
      myAccount: local_account.publicKey,
    })

    .rpc();
  console.log(tx);
  let data = await program.account.myAccount.fetch(local_account.publicKey);
  setCounter(data.counter);
  console.log(data);
};
export const Decrement = async (
  wallet: AnchorWallet,
  setCounter: React.Dispatch<React.SetStateAction<number>>,
  local_account: Keypair
) => {
  const connection = new Connection("http://localhost:8899", "processed");
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
  });
  const program = new anchor.Program(IDL, programId, provider);

  const tx = await program.methods
    .decrement()
    .accounts({
      myAccount: local_account.publicKey,
    })

    .rpc();
  console.log(tx);
  let data = await program.account.myAccount.fetch(local_account.publicKey);
  setCounter(data.counter);

  console.log(data);
};
export const Set = async (
  wallet: AnchorWallet,
  setCounter: React.Dispatch<React.SetStateAction<number>>,
  local_account: Keypair,
  val: number = 100
) => {
  const connection = new Connection("http://localhost:8899", "processed");
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
  });
  const program = new anchor.Program(IDL, programId, provider);
  let data = await program.account.myAccount.fetch(local_account.publicKey);
  const tx = await program.methods
    .set(data.counter + val)
    .accounts({
      myAccount: local_account.publicKey,
    })
    .rpc();
  console.log(tx);
  data = await program.account.myAccount.fetch(local_account.publicKey);
  setCounter(data.counter);

  console.log(data);
};
export const fetch_data = async (
  wallet: AnchorWallet,
  local_account: Keypair
) => {
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
