const ethers = require('ethers');

const employerAbi = require("./abis/employerAbi.json");

class Ethers {
    constructor() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        this.provider = provider
        this.signer = this.provider.getSigner();

        this.employer = new ethers.Contract("0x81C95c0Ea2E6D01adF057E791B40eE547e929Acc", employerAbi, this.signer);

        window.ethereum.on("accountsChanged", async () => {
            await this.connect();
            window.location.reload();
        })
    }

    connect = async function () {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = this.provider.getSigner();
        await provider.send("eth_requestAccounts", []);
        this.address = await signer.getAddress();
        console.log("Connected address is: ", this.address)
    }

    addVerifiedEmployee = async (response) => {
        try {
            const tx = await this.employer.addVerifiedEmployee(response);
            await tx.wait();
            return true;
        } catch (e) {
            if (e.error === (undefined)) {
                console.log("error: ", e.message)
                alert(e.message)
                return false
            }
            console.log("an error occurred: ", e.error.message)
            alert(e.error.message)
            return false
        }
    }

    provisionEmployee = async (token, amount, employee, expiry, allowlist) => {
        try {
            const tx = await this.employer.provisionEmployee(token, amount, employee, expiry, allowlist);
            await tx.wait();
            return true;
        } catch (e) {
            if (e.error === (undefined)) {
                console.log("error: ", e.message)
                alert(e.message)
                return false
            }
            console.log("an error occurred: ", e.error.message)
            alert(e.error.message)
            return false
        }
    }

    updateProvision = async(provisionId, amount, expiry, allowlist, denylist) => {
        try {
            const tx = await this.employer.updateProvision(provisionId, amount, expiry, allowlist, denylist);
            await tx.wait();
            return true;
        }  catch (e) {
            if (e.error === (undefined)) {
                console.log("error: ", e.message)
                alert(e.message)
                return false
            }
            console.log("an error occurred: ", e.error.message)
            alert(e.error.message)
            return false
        }
    }

    spendProvision = async(token, amount, recipient) => {
        try {
            const tx = await this.employer.spendProvision(token, amount, recipient);
            await tx.wait();
            return true;
        } catch (e) {
            if (e.error === (undefined)) {
                console.log("error: ", e.message)
                alert(e.message)
                return false
            }
            console.log("an error occurred: ", e.error.message)
            alert(e.error.message)
            return false
        }
    }

    provideRailgunAddr = async(addr) => {
        try {
            const tx = await this.employer.provideRailgunAddr(addr);
            await tx.wait();
            return true;
        } catch (e) {
            if (e.error === (undefined)) {
                console.log("error: ", e.message)
                alert(e.message)
                return false
            }
            console.log("an error occurred: ", e.error.message)
            alert(e.error.message)
            return false
        }
    }

    isVerifiedEmployee = async (address) => {
        const isVerified = await this.employer.isVerifiedEmployee(address);
        return isVerified;
    }
}

export default Ethers;