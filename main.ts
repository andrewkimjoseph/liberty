import { parseEther, toHex } from "viem";
import { mnemonicToAccount } from "viem/accounts";
import "dotenv/config";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";

const infuraAPIKey = process.env.INFURA_API_KEY;
const mnemonicPhrase = process.env.MNEMONIC_PHRASE_MAIN;
const recipientWalletAddress = process.env.RECIPIENT_WALLET_ADDRESS;
const amountAsString = process.env.AMOUNT_AS_STRING;

if (!infuraAPIKey) {
  throw new Error("Infura API Key is not set.");
}

if (!mnemonicPhrase) {
  throw new Error("Mnemonic phrase is not set.");
}

if (!recipientWalletAddress) {
  throw new Error("Recipient wallet address is not set.");
}

if (!amountAsString) {
  throw new Error("Amount as string address is not set.");
}

const web3 = new Web3(`https://celo-mainnet.infura.io/v3/${infuraAPIKey}`);

const kit = newKitFromWeb3(web3);

const mnemonicAccount = mnemonicToAccount(mnemonicPhrase);

async function transferCUSD(): Promise<void> {
  try {
    let cUSDcontract = await kit.contracts.getStableToken();

    kit.addAccount(toHex(mnemonicAccount.getHdKey().privateKey as Uint8Array));

    let accounts = await kit.web3.eth.getAccounts();
    kit.defaultAccount = accounts[0] as `0x${string}`;
    kit.setFeeCurrency(cUSDcontract.address);

    const txnResult = await cUSDcontract
      .transfer(
        recipientWalletAddress as string,
        parseEther(amountAsString as string).toString()
      )
      .send({ feeCurrency: cUSDcontract.address });

    console.log(txnResult);
  } catch (error) {
    console.error("Error fetching addresses:", error);
  }
}

transferCUSD();
