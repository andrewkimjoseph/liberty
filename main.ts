import { createPublicClient, createWalletClient, formatEther, formatUnits, http, parseEther, toHex } from "viem";
import { hdKeyToAccount, mnemonicToAccount, privateKeyToAccount } from "viem/accounts";
import { celo } from "viem/chains";
import "dotenv/config";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";

const infuraAPIKey = process.env.INFURA_API_KEY;
const mnemonicPhrase = process.env.MNEMONIC_PHRASE_MAIN;

if (!infuraAPIKey){
    throw new Error("Infura API Key is not set."); 
}

if (!mnemonicPhrase){
    throw new Error("Mnemonic phrase is not set."); 
}


const web3 = new Web3(`https://celo-mainnet.infura.io/v3/${infuraAPIKey}`);

const kit = newKitFromWeb3(web3);

const mnemonicAccount = mnemonicToAccount(mnemonicPhrase);

async function transferCUSD(recipientWalletAddress: string, amountAsString: string): Promise<void> {
    try {


        let cUSDcontract = await kit.contracts.getStableToken();

        kit.addAccount(toHex(mnemonicAccount.getHdKey().privateKey as Uint8Array));

        let accounts = await kit.web3.eth.getAccounts();
        kit.defaultAccount = accounts[0] as `0x${string}`;
        kit.setFeeCurrency(cUSDcontract.address);

        const txnResult = await cUSDcontract
            .transfer(recipientWalletAddress, parseEther(amountAsString).toString() )
            .send({ feeCurrency: cUSDcontract.address });

        console.log(txnResult);


    } catch (error) {
        console.error("Error fetching addresses:", error);
    }
}


transferCUSD("0x5E20682be95cD9319B0557d905384Bb356932116", "1");



