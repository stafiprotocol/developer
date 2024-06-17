# Relay of BTC LSD Stack

Btc-lsd-relay service is an off-chain service, it mainly acts as a pool. It receives BTCs from stakers and delegate them to Babylon. In the meantime it operates StakeManager contract to store states, mint LSTs, burn LST and update rate etc.

## Config

| config | description | example value |
| --- | --- | --- |
| **smart contract section** | | |
| bbnEndpoint | babylon smart contract endpoint | https://rpc-falcron.pion-1.ntrn.tech:443  |
| bbnKeyName  | account to send tx to contract | btcstaking(CHANGEME) |
| bbnGasPrice | the price per unit of gas | 0.05atom |
| bbnKeyringPath | the path of the keyring file  | /home/ubuntu/.stafi/btc-lsd-relay/keys |
| **btc section** | | |
| btcEndpoint | bitcoin REST RPC endpoint | http://127.0.0.1:38332 (signet)<br/>http://127.0.0.1:8332 (mainnet) |
| btcRpcUser | bitcoin rpc user | btcstaking(CHANGEME) |
| btcRpcPass | bitcoin rpc password | btcstaking(CHANGEME) |
| btcWalletName | bitcoin wallet name | btcstaking(CHANGEME) |
| btcWalletPass | bitcoin wallet password | btcstaking(CHANGEME) |
| btcNetwork | bitcoin network | signet,mainnet |
| btcStartBlock | from which block the relay service start monitoring staking transactions  | 198617 |
| btcMinFeeRate | the min fee rate used if the estimated fee is lower than this, the unit of this is (1000sats) | 1 |
| btcMaxFeeRate | the max fee rate used if the estimated fee is higher than this, the unit of this is (1000sats) | 20 |
| **staking section** | | |
| stakingApiEndpoint | babylon staking api endpoint | https://staking-api.testnet.babylonchain.io |
| stakeMangerAddress | stake manager contract address | |
