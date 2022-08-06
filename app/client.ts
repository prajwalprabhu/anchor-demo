import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { AnchorDemo } from "../target/types/anchor_demo";
import fs from "fs";
import my_account_secret_key from "../id.json";
// anchor.setProvider(anchor.AnchorProvider.env());
async function main() {
  const IDL = JSON.parse(
    fs.readFileSync("../target/idl/anchor_demo.json", "utf8")
  );

  const programId = new anchor.web3.PublicKey(
    "3SLWpmiJPJbLT4MfnitHHoAZyuayThJMuEmkfMcxeX2o"
  );

  // Generate the program client from IDL.
  const program: Program<AnchorDemo> = new anchor.Program(IDL, programId);
  const my_account = anchor.web3.Keypair.generate();
  // const my_account = anchor.web3.Keypair.fromSecretKey(
  //   new Uint8Array(my_account_secret_key)
  // );

  console.log(my_account.publicKey.toString());

  //   const my_account = anchor.Wallet.local();

  const provider = anchor.AnchorProvider.env();
  console.log(provider.publicKey.toString());

  await program.methods
    .initialize()
    .accounts({
      myAccount: my_account.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([my_account])
    .rpc();
  await program.methods
    .set(100)
    .accounts({ myAccount: my_account.publicKey })
    // .signers([my_account])
    .rpc();
  let data = await program.account.myAccount.fetch(my_account.publicKey);
  console.log(data);
}

main().then(() => {
  console.log("Done.... :)");
});
