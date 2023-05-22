# RichExplorer: Ethereum Block Explorer

Utilizing the [AlchemySDK](https://docs.alchemy.com/reference/alchemy-sdk-quickstart?a=eth-bootcamp) and [CoinGecko API](https://api.coingecko.com/api/v3/coins/ethereum) enables the ability built our very own **Ethereum Block Explorer**!

Block Explorers give us the ability to view lots of different information about the blockchain including data about:

- the blockchain network itself (Ethereum in this case)
- blocks in the blockchain
- transactions in a block
- accounts
- and many other things

[Etherscan](https://etherscan.io/) is a good example of an Ethereum blockexplorer. Check it out to get familiar with how blockexplorers generally work.

This particular project is very much open-ended. We'll add some challenges here to get your imagination going, but use Etherscan as a guide for features you might consider building in your project.

## Getting Started

- Clone this project.
- `cd` into the base directory of the project and run `npm install` to download all the project dependencies.

## Built With

- [Vite](https://vitejs.dev/) as a development server and bundler for React.
- [Tailwind CSS](https://tailwindcss.com/) is used for styling.
- [RainbowKit](rainbowkit.com) is a library used for implementing a cryptocurrency wallet and managing secure key storage.
- [Wagmi](https://wagmi.sh/) is a wallet integration library used to access information for linked wallets, such as account balance and transaction history.
- [AlchemySDK](https://docs.alchemy.com/reference/alchemy-sdk-quickstart?a=eth-bootcamp) is a library used to interact with the Ethereum blockchain, providing developers with APIs to send transactions, read contract data, and more.

The AlchemySDK's core package wraps almost all of the `ethers.js` provider functionality that we learned about and should feel very familiar to you.

For example, the following `ethers.js` code

```js
const blockNumber = await provider.getBlockNumber();
```

can be written using the AlchemySDK like so:

```js
const blockNumber = await alchemy.core.getBlockNumber();
```

> **⚠️ Note**\
> There are some `ethers.js` provider functions that are not often-used and therefore not included in `alchemy.core`. But if you ever need the full ethers provider functionality you can access the provider directly with the following code:

```js
const ethersProvider = await alchemy.config.getProvider();
```

You can find lots of good docs on the AlchemySDK here:

- [API Quickstart](https://docs.alchemy.com/reference/alchemy-sdk-quickstart?a=eth-bootcamp)
- [API Overview](https://docs.alchemy.com/reference/api-overview?a=eth-bootcamp)

## 1. Create a unique Alchemy API key

Create a unique Alchemy API Mainnet key [described here](https://docs.alchemy.com/reference/api-overview?a=eth-bootcamp).

## 2. Add API key to as an environment variable for the project

Create an empty `.env` file in the base directory of this project.

Add the following line to the `.env` file replacing `YOUR_ALCHEMY_API_KEY` with your api key.

```sh
VITE_ALCHEMY_API_KEY=YOUR_ALCHEMY_API_KEY
```

Do not remove the `VITE_` prefix. React uses that to import env variables.

**⚠️ Note**

> Alchemy API Mainnet Key is a sensitive piece of data. If we were
> building an enterprise app to conquer the world we would never place
> this sensitive data in the client code of our blockexplorer project that
> could potentially be read by anyone.

## 3. Start the Web Server

`npm run dev`

Running the command above will run the app in the development mode. Open [http://localhost:5173/](http://localhost:5173) to view it in your browser.

## 4. More ideas to think about

- Make an accounts page where a user can look up their balance or someone else's balance
- Clicking on Wallet when connected, connects to accounts page where a user can look up their balance

## 5. Supercharge your Block Explorer using AlchemySDK's specialized APIs

By using the AlchemySDK you can really supercharge your projects with additional API functionality that isn't included in the `ethers.js` package including:

- NFT methods
- WebSocket methods
- Alchemy's Transact API functionality
- endpoints for using Alchemy's Notify Webhooks

Read more about the above in the [Alchemy SDK Surface docs](https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview?a=eth-bootcamp). Using the SDK can implement the following features?

- Given a contract address and token id, can you get the NFT's metadata? []
- What is the floor price of an NFT right now? []
- Did a pending transaction get mined? [x]
- What transfers did an address receive this year? []
