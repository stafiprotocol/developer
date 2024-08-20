# Blinks Module

Solana Blinks are a new way to interact with the Solana network across various platforms. Blinks function as special URLs that enable users to perform a wide range of blockchain actions directly within social media platforms like X (formerly Twitter), with potential expansion to Discord and Reddit.

As part of our LSD stack, we offer this module to project teams, enabling them to deploy and manage their Blinks effortlessly, without requiring additional development effort.

## Compatibility

- Solana LSD only

## Setup Node.js env

1. Fork [code on GitHub](https://github.com/stafiprotocol/sol-blinks)
1. Install [Node.js >=v16](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
1. Install yarn via npm: `npm install --global yarn`
1. Enter project root directory then install all dependencies via terminal: `yarn`
1. Start app by: `yarn dev`

The server's port can be configured in `config/appConf/dev.json`

## Config program accounts

- Set your network addresses here: `config/appConf/dev.json`

| config                     | description                                                                                   | example value |
| -------------------------- | --------------------------------------------------------------------------------------------- | ------------- |
| lsdProgramId               | lsd program ID **provided by 61Lab**                                                          |               |
| stakeManagerAccountAddress | stake manager address of the LSD network created by [Stack App](https://stack-app.stafi.io/)  |               |
| lsdTokenMint               | lsd token mint address of the LSD network created by [Stack App](https://stack-app.stafi.io/) |               |

## Config stake actions

- Set your stake actions here: `config/actions.js`

The actions list will be rendered as interactive buttons, e.g.:

```javascript
export const StakeActions = [
	{
		label: 'Stake 1 SOL', // button label
		amount: 1, // stake amount
	},
	{
		label: 'Stake SOL',
		customAmount: true, // set this to `true` if you want user to input amount
		placeholder: 'Enter the amount of SOL to stake',
	},
];
```

## Preview the stake function

1. Install `Backpack` wallet and set its custom RPC to https://solana-dev-rpc.stafi.io
1. Open [Dialect](https://dial.to/developer), and connect with Backpack wallet
1. Copy and paste `http://localhost:9876/api/actions/stake` to the Action URL input
1. Click Blinks button to send transactions

### Note

Dialect only supports Mainnet and Devnet, so the transaction will be timed out shown on the page, but it actually succeeded.

You can view the transaction status on Solana Explorer, remember to set the custom RPC to https://solana-dev-rpc.stafi.io.

![Preview](./assets/solana-blinks-preview.png 'Preview')
