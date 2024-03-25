# ETH LSD App

ETH LSD App is a user interface where users can stake, unstake and get latest information about the project. As a convention in web3 all API users interact with are directly from the RPC configured in wallet, so the app is a pure DApp.

![ETH LSD App Homepage](/image/ethlsd/eth_lsd_app_homepage.png 'ETH LSD APP Homepage')

![ETH LSD App Notification Page](/image/ethlsd/eth_lsd_app_notification.png 'ETH LSD APP Notification Page')

# Build your own LSD App

## Setup Node.js env

1. Fork [code on GitHub](https://github.com/stafiprotocol/eth-lsd-app)
1. Install [Node.js >=v16](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
1. Install yarn via npm: `npm install --global yarn`
1. Enter project root directory then install all dependencies via terminal: `yarn`
1. Start app by: `yarn dev`

## Configure your app

> In normal case you do not need update ABI files, but if you modify the contracts then you probably want to update abi files which are in `config/abi` folder.

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
  "unstake": {
    // lock tip info shown in unstake page
    "lockTipLink": "https://docs.stafi.io/stakingeth/unstake/",
    "duration": "1-5 days"
  },
  "apr": 3.1, // default apr of lsd token
  "detailedInfo": {
    // audit info in Detail Info section
    "audit": {
      "nameList": ["Peckshield", "Blocksec"],
      "link": "https://github.com/stafiprotocol/security/blob/main/audits/202304_BlockSec_StaFi-ETHWithdraw/blocksec_stafi_v1.0-signed.pdf"
    },
    "listedIns": [
      {
        "name": "Coingecko",
        "link": "https://www.coingecko.com/en/coins/stafi-staked-eth"
      }
    ]
  },
  "auditList": [
    // by which the lsd contracts are audited
    {
      "name": "PeckShield", // name and icon are shown on the top of the app
      "icon": "/images/audit/peck_shield.svg",
      "iconDark": "/images/audit/peck_shield_dark.svg"
    }
  ],
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
  "gasPriceUrl": "https://beaconcha.in/api/v1/execution/gasnow" // api to query gas price
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

Run `yarn build` or `yarn build:dev` to build your app, the static files will be placed in `out` folder. Upload those files to any static web hosting services you like.
