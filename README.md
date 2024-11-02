# Liberty
A Node.js script to help you to move the cUSD Stablecoin from any EVM-compatible wallet within the Celo blockchain to another, using a mnemonic phrase. It use Celo's `contractkit`, along `viem` and `web3`.

# Environment variables
This project uses the following environment variables:

- INFURA_API_KEY
- MNEMONIC_PHRASE_MAIN
- RECIPIENT_WALLET_ADDRESS
- AMOUNT_AS_STRING


# Getting started
- Clone the repository
```
git clone  https://github.com/andrewkimjoseph/liberty.git
```
- Install dependencies
```
cd liberty
npm install
```
- Run the project
```
npx tsx main.ts
```





