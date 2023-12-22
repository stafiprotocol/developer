# Ejector

Ejector service plays an important role in ETH LSD stack. Every validator should run an ejector service to properly handle the validator exiting process, as users are free to `unstake` and `withdraw`.

‼️**When use our SSV client service to run validators, you don't need to run the ejector service, cause it is embedded in the SSV client service.**

| config | description | example value |
| --- | --- | --- |
| consensus_endpoint | Execution RPC endpoint | https://eth-goerli.g.alchemy.com/v2/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX |
| execution_endpoint | Consensus (Beacon chain) RPC endpoint | https://beacon-lighthouse-goerli.stafi.io/ |
| keys_dir | keystore path created by https://github.com/ethereum/staking-deposit-cli | ./validator_keys |
| withdraw_address | Contract address of NetworkWithdraw | 0x_NETWORK_WITHDRAW_CONTRACT_ADDR |