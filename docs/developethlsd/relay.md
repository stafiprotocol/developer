# Relay

Eth-lsd-relay is an off-chain relay service responsible for interacting with Eth LSD contracts, synchronizing blocks and events, handling tasks related to validators and balances, and other off-chain operations.

- **Submit Balances** (`submit_balances`): Involves fetching on-chain balance data and submitting it to the networkBalancesContract.
- **Update Validators** (`update_validators`): Retrieves a new list of validators, adds new validators, and updates existing validators.
- **Prune Block Data** (`prune_blocks`): Prunes old, no longer needed block data to reduce cache size and memory usage. It determines which blocks should be pruned based on several key height parameters to ensure that data still needed is not accidentally deleted.
- **Vote Withdraw Credentials** (`vote_withdraw_credentials`): When validators wish to withdraw from the network, their withdrawal credentials need to be voted on and validated. ETH Lsd Relay provides a mechanism to automate this process, ensuring that only valid withdrawal requests are approved.
- **Sync Block Data** (`sync_blocks`): Involves fetching the latest block data from the Ethereum blockchain and synchronizing it to the cache.
- **Distribute Priority Fee** (`distribute_priority_fee`): Distributes the priority fee. This is done through interactions with the Eth Lsd contract and related calculations. This service also ensures distribution only occurs under specific conditions.
- **Set Merkle Tree Root** (`set_merkle_root`): Calculates the final node rewards list based on node reward lists and new node reward lists. Constructs a Merkle tree for the final node rewards list. Serializes the final node rewards list to JSON and uploads it to decentralized storage. Sends a transaction to set the Merkle tree root.
- **Distribute Withdrawals** (`distribute_withdrawals`): Handles withdrawal requests from users or nodes and distributes funds.
- **Notify Validator Exit** (`notify_validator_exit`): Sends notifications when validators exit or are kicked out.

### Config

| config | description | example value | recommended value |
| --- | --- | --- | --- |
| account | voter account addressMake sure you imported it before using |  |  |
| trustNodeDepositAmount     | the trust node validator initial deposit amount | 1  |  |
| eth2EffectiveBalance       | the effective balance of a validator            | 32 |  |
| maxPartialWithdrawalAmount | max partial withdrawal amount                   | 8  |  |
| gasLimit    |  |  | 3000000 |
| maxGasPrice |  |  | 600000000000 (in wei) |
| batchRequestBlocksNumber | a number which limits concurrent requests on Beacon chain, due to the design of Beacon chain RPC |  | 32 |
| runForEntrustedLsdNetwork | set this config to true only if you are one of the entrusted voters who are responsible to relay data for entrusted LSD networks | false | false |

### Pinata section

| config | description | recommended value |
| --- | --- | --- |
| apikey  | apikey of your pinata account |   |
| pinDays | how many days the data retained on IPFS  | 180 |

### Contracts section

| config | description | example value | recommended value |
| --- | --- | --- | --- |
| lsdTokenAddress | lsd token address |  |  |
| lsdFactoryAddress | lsd factory address |  |  |

### Endpoints section

Groups of eth1 and eth2 endpoints. It will be used only if previous ones are not available.

| config | description | example value | recommended value |
| --- | --- | --- | --- |
| eth1 | Execution RPC endpoint | http://127.0.0.1:8545 |  |
| eth2 | Consensus (Beacon chain) RPC endpoint | https://holesky-beacon.stafi.io |  |