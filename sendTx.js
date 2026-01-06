import 'dotenv/config';
import { ethers } from "ethers";

const RPC_URL = "https://sepolia.infura.io/v3/YOUR_INFURA_KEY";

const PRIVATE_KEY = process.env.PRIVATE_KEY; 
const TO_ADDRESS = process.env.TO_ADDRESS;   
const AMOUNT = process.env.AMOUNT; 

async function sendTransaction() {
    try {
        if (!PRIVATE_KEY || !TO_ADDRESS || !AMOUNT) {
            throw new Error("Missing environment variables. Please set PRIVATE_KEY, TO_ADDRESS, and AMOUNT.");
        }
        const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
        const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
        console.log("Sender:", wallet.address); 

        const tx = {
          to: TO_ADDRESS,
          value: ethers.parseEther(AMOUNT),
        };

        console.log("Sending a transaction...");

        const txResponse = await wallet.sendTransaction(tx);
        console.log("Transaction sent! Hash:", txResponse.hash);
    } catch (error) {
        console.error("Error sending transaction:", error);
    }
}
sendTransaction();