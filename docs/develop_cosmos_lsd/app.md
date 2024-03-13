# Cosmos LSD App

Cosmos LSD App is a user interface where users can stake, unstake and get latest information about the project. As a convention in web3 all API users interact with are directly from the RPC configured in wallet, so the app is a pure DApp.

![Cosmos LSD App Homepage](/image/cosmos_lsd/app_homepage.png 'Cosmos LSD APP Homepage')

![Cosmos LSD App Notification Page](/image/cosmos_lsd/app_notification_page.png  'Cosmos LSD APP Notification Page')

# Build your own LSD App

## Setup Node.js env
1. Fork [code on GitHub](https://github.com/stafiprotocol/neutron-lsd-app)
1. Install [Node.js >=v16](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
1. Install yarn via npm: `npm install --global yarn`
1. Open code in VSCode
1. Enter project root directory then install all dependencies via terminal: `yarn`
1. Start app by: `yarn dev`

## Config your app

- Change branding links and text here: `config/appConf/app.json`
- Set your pool address and lsd configs on Testnet here: `config/appConf/dev.json`
- Set your pool address and lsd configs on Mainnet here: `config/appConf/prod.json`

## Customize Theme

You can change color config in `tailwind.config.js`, each color has light & dark versions(i.e text1 & text1Dark).

![Customize Theme](/image/ethlsd/customize_theme.png "Customize Theme")

## Build and deploy

Run `yarn build` or `yarn build:dev` to build your app, the static files will be placed in `out` folder. Upload those files to any static web hosting services you like.
