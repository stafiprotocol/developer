# Relay

Eth-lsd-relay is an off-chain relay service responsible for interacting with Eth LSD contracts, synchronizing blocks and events, handling tasks related to validators and balances, and other off-chain operations.

- **Submit Balances** (`submit_balances`): Calculate total user ETH according to Execution chain and Beacon chain and submit it to networkBalances contract.
- **Update Validators** (`update_validators`): Retrieve new validators and updates existing validators.
- **Prune Block Data** (`prune_blocks`): Prune old, no longer needed block data to reduce cache size and memory usage. It determines which blocks should be pruned based on several key height parameters to ensure that data still needed is not accidentally deleted.
- **Vote Withdraw Credentials** (`vote_withdraw_credentials`): Vote for new validator pubkey by verifying that the withdrawal credentials and amount on chain match the network's requirements. If it matches, the validator is allowed to invoke `stake` method to become an active validator. This approach can effectively prevent malicious attacks.
- **Sync Block Data** (`sync_blocks`): Fetch and cache the latest block data from the Ethereum blockchain
- **Set Merkle Tree Root** (`set_merkle_root`): Calculate the final node rewards list based on node reward lists and new node reward lists. Constructs a Merkle tree for the final node rewards list. Serializes the final node rewards list to JSON and uploads it to decentralized storage. Sends a transaction to set the Merkle tree root.
- **Distribute Priority Fee** (`distribute_priority_fee`): Distribute the priority fee and set the maxClaimableWithdrawIndex of the network.
- **Distribute Withdrawals** (`distribute_withdrawals`): Distribute the rewards and set the maxClaimableWithdrawIndex of the network.
- **Notify Validator Exit** (`notify_validator_exit`): Choose validators to exit if the active balance of the pool could not fulfill users' unstaking needs.

### Config

| config | description | example value | recommended value |
| --- | --- | --- | --- |
| account | voter account address<br>Make sure you imported it before using |  |  |
| trustNodeDepositAmount     | the trust node validator initial deposit amount | 1 (ETH) |  |
| eth2EffectiveBalance       | the effective balance of a validator            | 32 (ETH) | 32 (ETH) |
| maxPartialWithdrawalAmount | The threshold used to differentiate between rewards and exit balance.<br>If the amount received from Beacon chain is less than this value, it is treated as rewards; otherwise, it is considered as exit balance. | 8 (ETH)  | 8 (ETH) |
| gasLimit    | the maximum amount of gas you are willing to pay for a transaction | 3000000 | 3000000 |
| maxGasPrice | the highest price you are willing to pay for each unit of gas | 600 (Gwei) | 600 (Gwei) |
| batchRequestBlocksNumber | specify the max number of concurrent requests made to Beacon RPC;<br>The **maximum value is 32**;<br>Lower the value if it reaches your RPC rete limit | 16 | 16 |
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