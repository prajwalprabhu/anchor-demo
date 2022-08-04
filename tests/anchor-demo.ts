import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { AnchorDemo } from "../target/types/anchor_demo";

describe("anchor-demo", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.local());
  const my_account = anchor.web3.Keypair.generate();
  const user = anchor.AnchorProvider.local();

  const program = anchor.workspace.AnchorDemo as Program<AnchorDemo>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods
      .initialize()
      .accounts({
        myAccount: my_account.publicKey,
        user: user.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([my_account])
      .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Is incriment!", async () => {
    // Add your test here.
    await program.methods
      .increment()
      .accounts({
        myAccount: my_account.publicKey,
      })
      .rpc();
    await program.methods
      .increment()
      .accounts({
        myAccount: my_account.publicKey,
      })
      .rpc();
    await program.methods
      .increment()
      .accounts({
        myAccount: my_account.publicKey,
      })
      .rpc();
    let data = await program.account.myAccount.fetch(my_account.publicKey);
    console.log(data);
  });
  it("Is decriment!", async () => {
    // Add your test here.
    await program.methods
      .decrement()
      .accounts({
        myAccount: my_account.publicKey,
      })
      .rpc();
    let data = await program.account.myAccount.fetch(my_account.publicKey);
    console.log(data);
  });
  it("Is set!", async () => {
    // Add your test here.
    const tx = await program.methods
      .set(100)
      .accounts({
        myAccount: my_account.publicKey,
      })
      .rpc();
    let data = await program.account.myAccount.fetch(my_account.publicKey);
    console.log(data);
  });
});
