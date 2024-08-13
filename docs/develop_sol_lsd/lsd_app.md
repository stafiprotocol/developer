# solana-lsd-app

Solana LSD App is a user interface where users can stake, unstake and get latest information about the project. As a convention in web3 all API users interact with are directly from the RPC configured in wallet, so the app is a pure DApp.

## Setup Node.js env

1. Install Node.js >= v16
2. Install yarn via npm: `npm install --global yarn`
3. Enter project root directory then install all dependencies via terminal: `yarn`
4. Start app by: `yarn dev`

## Config your app

In normal case you do not need update IDL files, but if you modify the LSD program then you will update IDL files in `config/idl` folder.

- Change branding links and text here: `config/appConf/app.json`
- Set your network addresses for development environment here: `config/appConf/dev.json`
- Set your network addresses for production environment here: `config/appConf/prod.json`

| config | description | example value |
| ------ | ----------- | --- |
| lsdProgramId | lsd program ID **provided by 61Lab** | |
| stakeManagerAccountAddress | stake manager address of the LSD network created by [Stack App](https://stack-app.stafi.io/) | |
| lsdTokenMint | lsd token mint address of the LSD network created by [Stack App](https://stack-app.stafi.io/) | |


## Customize theme

You can change color config in `tailwind.config.js`, each color has light & dark versions(i.e text1 & text1Dark).

## Build and deploy

Run `yarn build` or `yarn build:dev` to build your app, the static files will be placed in `out` folder. Upload those files to any static web hosting services you like.
