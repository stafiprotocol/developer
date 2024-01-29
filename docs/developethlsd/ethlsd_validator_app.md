# ETH LSD Validator App

ETH LSD Validator App is a user interface where node operaters can participate in as validators. As a convention in web3 all API users interact with are directly from the RPC configured in wallet, so the app is a static web app.

![ETH LSD Validator App Homepage](/image/ethlsd/eth_lsd_validator_app_homepage.png 'ETH LSD Validator App Homepage')

![ETH LSD Validator App Pool Page](/image/ethlsd/eth_lsd_validator_app_pool_page.png  'ETH LSD Validator App Pool Page')

# Build your own LSD App

## Setup Node.js env
1. Fork [code on GitHub](https://github.com/stafiprotocol/eth-lsd-validator-app)
1. Install [Node.js >=v16](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
1. Install yarn via npm: `npm install --global yarn`
1. Open code in VSCode
1. Install all dependencies via terminal: `yarn`
1. Develop app by: `yarn dev`

## Config your app

> In normal case you do not need update ABI files, but if you had contracts modified then you may want to update abi contents which are in `config/contractAbi.ts` file.

- Change branding links and text here: `config/appConf/app.json`
- Set your network contract address on Holesky here: `config/appConf/dev.json`
- Set your network contract address on Mainnet here: `config/appConf/prod.json`

## Customize Theme

You can change color config in `tailwind.config.js`, each color has light & dark versions(i.e text1 & text1Dark).

![Customize Theme](/image/ethlsd/customize_theme.png "Customize Theme")



## Build and deploy

Run `yarn build` or `yarn build:dev` to build your validator app, the static files will be placed in `out` folder. Upload those files to any static web hosting services you like.
