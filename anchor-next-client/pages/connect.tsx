require("../styles/Connect.module.css");

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  WalletConnectButton,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import Redirect from "../components/Redirect";

function Connect() {
  const Router = useRouter();
  const { connected } = useWallet();
  if (connected) {
    return <Redirect to="/" />;
  }
  return (
    <div className="container">
      <WalletConnectButton />
      <WalletMultiButton />
      <WalletDisconnectButton />
      <h2>Connect to wallet</h2>
    </div>
  );
}

export default Connect;
