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
    const [tokenAddress, setTokenAddress] = useState("");
    const [amount, setAmount] = useState("");
    const [recipient, setRecipient] = useState("");
    const [railgunAddress, setRailgunAddress] = useState("");
    const [token, setToken] = useState("");
    const [employee, setEmployee] = useState("");
    const [expiry, setExpiry] = useState("");
    const [allowlist, setAllowlist] = useState("");
    const [id, setId] = useState("");
    const [denylist, setDenylist] = useState("");
  
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
  
    async function handleSend(e) {
      e.preventDefault();
      try {
        // Hívja az ethers objektum spendProvision funkcióját a megadott értékekkel.
        const res = await ethers.spendProvision(tokenAddress, amount, recipient);
        await res.wait();
        console.log('Token sent successfully');
      } catch (error) {
        console.error('There was an error while sending: ', error);
      }
    }
  
    async function handleAddRailgun(e) {
      e.preventDefault();
      try {
        const res = await ethers.provideRailgunAddr(railgunAddress);
        await res.wait();
        console.log('Railgun address added successfully');
      } catch (error) {
        console.error('There was an error while trying to add Railgun address: ', error);
      }
    }
    

    async function handleAllowanceAdd(e) {
      e.preventDefault();
      try {
        const res = await ethers.provisionEmployee(token, amount, employee, expiry, allowlist);
        await res.wait();
        console.log('Employee provision added successfully');
      } catch (error) {
        console.error('There was an error while adding provision: ', error);
      }
    }
    
  
    async function handleAllowanceUpdate(e) {
      e.preventDefault();
      try {
        const res = await ethers.updateProvision(id, amount, expiry, allowlist, denylist);
        await res.wait();
        console.log('Provision updated');
      } catch (error) {
        console.error('There was an error while updating provision: ', error);
      }
    }
    
  
  
    return (
      <div className="page-container">
        <div className="upper-part">
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
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Recipient"
              />
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
          <div className="railgun-section">
            <h2>Add Railgun Address</h2>
            <form>
              <input 
                type="text"
                value={railgunAddress}
                onChange={(e) => setRailgunAddress(e.target.value)}
                placeholder="Address"
              />
              <button onClick={handleAddRailgun}>Add</button>
            </form>
          </div>
        </div>
        <div className="lower-part">
        <div className="employee-section">
          <h2>Add allowance for employee</h2>
          <form>
            <input 
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Token"
            />
            <input 
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
            />
            <input 
              type="text"
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
              placeholder="Employee"
            />
            <input 
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="Expiry"
            />
            <input 
              type="text"
              value={allowlist}
              onChange={(e) => setAllowlist(e.target.value)}
              placeholder="Allowlist"
            />
            <button onClick={handleAllowanceAdd}>Add</button>
          </form>
        </div>
        <div className="update-section">
          <h2>Update allowance for employee</h2>
          <form>
            <input 
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="ID"
            />
            <input 
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
            />
            <input 
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="Expiry"
            />
            <input 
              type="text"
              value={allowlist}
              onChange={(e) => setAllowlist(e.target.value)}
              placeholder="Allowlist"
            />
            <input 
              type="text"
              value={denylist}
              onChange={(e) => setDenylist(e.target.value)}
              placeholder="Denylist"
            />
            <button onClick={handleAllowanceUpdate}>Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
  