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

const GROU_ID = "0xeb8feea83ddaf266a806ee40c1b04fba";

const sismoConnectConfig = {
    appId: "0xd345943db0a9c43788a850b039560e05",
    devMode: {
      enabled: true
    }
  };

function HomePage() {
  let [responseBytes, setResponseBytes, address] = useState("");

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
        await ethers.addVerifiedEmployee(responseBytes);
    }

    function signMessage (address) {
        const res = encodeAbiParameters(
          [{ type: "address", name: "airdropAddress" }],
          [address]
        )
        return res;
    }


  return (
    <div>
      <SismoConnectButton
        config={sismoConnectConfig}
        auths={[{ authType: AuthType.VAULT }]}
        signature={{ message: signMessage(address ?? "0x1c46D242755040a0032505fD33C6e8b83293a332") }}
        onResponseBytes={(responseBytes) => setResponse(responseBytes)}
        text={"Claim with Sismo"}
      />
    </div>
  );
}

export default HomePage;
