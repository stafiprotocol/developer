# Relay

Eth-lsd-relay is an off-chain relay service responsible for interacting with Eth LSD contracts, synchronizing blocks and events, handling tasks related to validators and balances, and other off-chain operations.

- **Submit Balances** (`submit_balances`): Involves fetching on-chain balance data and submitting it to the networkBalancesContract.
- **Update Validators** (`update_validators`): Retrieves a new list of validators, adds new validators, and updates existing validators.
- **Prune Block Data** (`prune_blocks`): Prunes old, no longer needed block data to reduce cache size and memory usage. It determines which blocks should be pruned based on several key height parameters to ensure that data still needed is not accidentally deleted.
- **Vote Withdraw Credentials** (`vote_withdraw_credentials`): When validators wish to withdraw from the network, their withdrawal credentials need to be voted on and validated. ETH Lsd Relay provides a mechanism to automate this process, ensuring that only valid withdrawal requests are approved.
- **Sync Block Data** (`sync_blocks`): Involves fetching the latest block data from the Ethereum blockchain and synchronizing it to the cache.
- **Distribute Priority Fee** (`distribute_priority_fee`): Distributes the priority fee. This is done through interactions with the Eth Lsd contract and related calculations. This service also ensures distribution only occurs under specific conditions.
- **Set Merkle Tree Root** (`set_merkle_root`): Calculates the final node rewards list based on node reward lists and new node reward lists. Constructs a Merkle tree for the final node rewards list. Serializes the final node rewards list to JSON and uploads it to Web3 storage. Sends a transaction to set the Merkle tree root.
- **Distribute Withdrawals** (`distribute_withdrawals`): Handles withdrawal requests from users or nodes and distributes funds.
- **Notify Validator Exit** (`notify_validator_exit`): Sends notifications when validators exit or are kicked out.

## Config

| config | description | example value | recommended value |
| --- | --- | --- | --- |
| eth1Endpoint | Execution RPC endpoint | https://eth-goerli.g.alchemy.com/v2/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX |  |
| eth2Endpoint | Consensus (Beacon chain) RPC endpoint | https://beacon-lighthouse-goerli.stafi.io/ |  |
| web3StorageApiToken | get web3 storage api token from https://web3.storage/ |  |  |
| logFilePath | local directory path to store logs |  | ./logs |
| account | voter account addressMake sure you imported it before using |  |  |
| keystorePath | local directory path to store accounts keystore files |  | ./keys |
| gasLimit |  |  | 3000000 |
| maxGasPrice |  |  | 60000000000 (in wei) |
| batchRequestBlocksNumber | a number which limits concurrent requests on Beacon chain, due to the design of Beacon chain RPC |  | 32 |

### Contracts section

| config | description | example value | recommended value |
| --- | --- | --- | --- |
| lsdTokenAddress | lsd token address |  |  |
| lsdFactoryAddress | lsd factory address |  |  |
- Ejector
    
Ejector service plays an important role in ETH LSD stack. Every validator should run an ejector service to properly handle the validator exiting process, as users are free to `unstake` and `withdraw`.
    
‼️**When use our SSV client service to run validators, you don't need to run the ejector service, cause it is embedded in the SSV client service.**
    
| config | description | example value |
| --- | --- | --- |
| consensus_endpoint | Execution RPC endpoint | https://eth-goerli.g.alchemy.com/v2/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX |
| execution_endpoint | Consensus (Beacon chain) RPC endpoint | https://beacon-lighthouse-goerli.stafi.io/ |
| keys_dir | keystore path created by https://github.com/ethereum/staking-deposit-cli | ./validator_keys |
| withdraw_address | Contract address of NetworkWithdraw | 0x_NETWORK_WITHDRAW_CONTRACT_ADDR |