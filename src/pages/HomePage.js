import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    SismoConnectButton,
    SismoConnectClientConfig,
    AuthType,
  } from "@sismo-core/sismo-connect-react";
import Ethers from '../ethers';
import {
    Chain,
    PublicClient,
    WalletClient,
    createPublicClient,
    createWalletClient,
    encodeAbiParameters,
    http,
    parseEther,
  } from "viem";

const sismoConnectConfig = {
    appId: "0xd345943db0a9c43788a850b039560e05"
  };


function HomePage() {
  const [responseBytes, setResponseBytes] = useState("");
  const ethers = new Ethers();

  useEffect(() => {
    async function connectEthers() {
        // Ether address
        await ethers.connect()
        console.log(ethers.address)
    }
    connectEthers()
    }, [])

    async function setResponse(responseBytes) {
        console.log(responseBytes)
        //await ethers.addVerifiedEmployee(responseBytes);
    }

    async function signMessage (address) {
        return encodeAbiParameters(address)
    }


  return (
    <div>
      <SismoConnectButton
        config={sismoConnectConfig}
        auths={[{ authType: AuthType.VAULT }]}
        signature={{ message: signMessage(ethers.address) }}
        onResponseBytes={(responseBytes) => setResponse(responseBytes)}
        text={"Claim with Sismo"}
      />

        {responseBytes && <div>Response: {responseBytes}</div>}
    </div>
  );
}

export default HomePage;
