# ETH LSD Validator App

ETH LSD Validator App is a user interface where node operators can participate in as validators. As a convention in web3 all API users interact with are directly from the RPC configured in wallet, so the app is a pure DApp.

![ETH LSD Validator App Homepage](/image/ethlsd/eth_lsd_validator_app_homepage.png 'ETH LSD Validator App Homepage')

![ETH LSD Validator App Pool Page](/image/ethlsd/eth_lsd_validator_app_pool_page.png 'ETH LSD Validator App Pool Page')

# Build your own LSD App

## Setup Node.js env

1. Fork [code on GitHub](https://github.com/stafiprotocol/eth-lsd-validator-app)
1. Install [Node.js >=v16](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
1. Install yarn via npm: `npm install --global yarn`
1. Enter project root directory then install all dependencies via terminal: `yarn`
1. Start app by: `yarn dev`

## Config your app

> In normal case you do not need update ABI files, but if you had contracts modified then you may want to update abi contents which are in `config/contractAbi.ts` file.

- Change branding links and text here: `config/appConf/app.json`

```json
// here are some config examples in app.json
{
  "appTitle": "ETH LSD App", // title of this app
  "token": {
    // token infos
    "tokenName": "ETH", // name of the original token
    "lsdTokenName": "rETH", // name of the lsd token
    "supportChains": ["Ethereum"], // chains which lsd token can be supported
    "lsdTokenIconUri": "https://cdn.stafi.io/rtoken/logo/rETH.png", // icon link of lsd token
    "ETHImg": "/images/token/ETH_green.svg", // icon of ETH token
    "lsdETHImg": "/images/token/lsdETH.svg" // icon of lsd token
  },
  "supportRestApi": true, // Node Ejection section will be shown in Pubkeys page if this value is true
  "apr": 3.1, // default apr of lsd token
  "faqList": [
    // FAQs list
    {
      "title": "What are the factors that affect the staking rewards?", // question title
      "contents": [
        // answer of the question, it's comprised of a list of pure texts and links
        {
          "type": "text",
          "content": "To learn more about how staking rewards are calculated, please read:\n"
        },
        {
          "type": "link",
          "content": "https://docs.stafi.io/rtoken/#rtoken-exchange-rate\n",
          "link": "https://docs.stafi.io/rtoken/#rtoken-exchange-rate"
        }
      ]
    }
  ],
  "externalLinkList": [
    // external links related to the app which shown in the setting drawer
    {
      "name": "Docs",
      "link": "https://docs.stafi.io/"
    }
  ],
  "contactList": [
    // media list shown in the setting drawer
    {
      "type": "Twitter",
      "link": "https://twitter.com/Stafi_Protocol"
    }
  ],
  "gasPriceUrl": "https://beaconcha.in/api/v1/execution/gasnow", // api to query gas price
  "docLinks": {
    // doc links in Pool page
    "ejectionMechanism": "", // doc link of Ejection Mechanism
    "delegationMechanism": "" // doc link of Delegation Mechanism
  }
}
```

- Set your network contract address on Holesky here: `config/appConf/dev.json`
- Set your network contract address on Mainnet here: `config/appConf/prod.json`

```json
// config structures are identical in dev.json and prod.json
// dev.json will be used when you build with `yarn build:dev`
// prod.json will be used when you build with 'yarn build`
{
  "chain": {
    // chain which lsd app runs on
    "id": 17000,
    "name": "Holesky"
  },
  "rpc": "https://ethereum-holesky.publicnode.com", // rpc link of the chain
  "beaconHost": "https://holesky-beacon.stafi.io", // url of beacon host
  "contracts": {
    // lsd contract addresses
    "lsdTokenContract": {
      // address of lsd token contract
      "address": "0xe1A2391f4902f8bc1fd447192c4a165A7a05189b"
    },
    "depositContract": {
      // address of lsd deposit contract
      "address": "0xF077Af44C0EE18d7b960C6C527a249820706a317"
    },
    "withdrawContract": {
      // address of lsd withdraw contract
      "address": "0x0f25a7400EB9a6225F669B99a9aCa46442213632"
    },
    "networkBalanceContract": {
      // address of lsd network balance contract
      "address": "0x5bEB668968a931b961a7D9a4da6150b7A03a0093"
    }
  }
}
```

## Customize Theme

You can change color config in `tailwind.config.js`, each color has light & dark versions(i.e text1 & text1Dark).

![Customize Theme](/image/ethlsd/customize_theme.png 'Customize Theme')

## Build and deploy

Run `yarn build` or `yarn build:dev` to build your validator app, the static files will be placed in `out` folder. Upload those files to any static web hosting services you like.
