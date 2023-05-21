import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/HomePage.module.css'
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


    const [tokenAddress, setTokenAddress] = useState('');
    const [amount, setAmount] = useState('');
  
    const handleSend = () => {
      // Implement the send function here
      console.log('Token Address:', tokenAddress);
      console.log('Amount:', amount);
    };
  
    return (
      <div className="page-container">
        <div className="upper-part">
          {/* Other content goes here */}
        </div>
        <div className="lower-part">
          <div className="register-section">
            <h2>Employee</h2>
            <SismoConnectButton
              config={sismoConnectConfig}
              auths={[{ authType: AuthType.VAULT }]}
              signature={{ message: signMessage(address ?? "0xa707e5F9bc7429082b997C686baF547A8B1F5951") }}
              onResponseBytes={(responseBytes) => setResponse(responseBytes)}
              text={"Register employee"}
            />
          </div>
          <div className="send-section">
            <h2>Send Tokens</h2>
            <form>
              <input 
                type="text"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                placeholder="Token Address"
              />
              <input 
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
              />
              <button onClick={handleSend}>Send</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  
export default HomePage;
