# Relay of Cosmos LSD Stack 

Given the limitation of smart contracts, they are not self-executing, and require an external force to trigger their functions. Relay is a service to drive LSD to properly process its own internal states, such as dealing with delegating, undelegating, distributing rewards and calculating the rate between LST and the original coin. We introduce `era` concept to define how often the smart contract should be called. Most of the time, an era is 24 hours long.

*Security* is the our first priority when developing Stack, We are thrilled to say that the new era process is permissionless, showcasing the decentralized nature of the Cosmos LSD Stack, allowing anyone to trigger the beginning of a new era. Each step in the process includes sufficient condition checks to prevent the contract from re-processing transactions or prematurely moving to subsequent steps. The new era process will be triggered when a pool meets the conditions for starting a new era (i.e., reaching the time to start the next era).

The relay solution for chains only support ICS-27 protocol differs from those support Native CosmWasm, therefore we provide two proper relay types.

# Neutron(ICS-27) LSD Relay

### era_update
Transfer the tokens at an era on the neutron chain to the account on the original chain through ICA and interchain transactions.

### era_stake
Handles staking, unstaking, and withdrawal transactions on the original chain.

### era_withdraw_collect
Collects rewards from the previous era into the pool ICA account in preparation for restake.

### era_restake
Restake rewards generated in the previous era.

### era_active
Handles the data changes caused by new stakes or unstakes in the new era process, calculates the new era's rate, and initiates the new era.

### redeem_token_for_share
The delegations are not transfered to pool ica account immediately when user stake LSM. We call this mehtod to redeem the delegations.

## Config

| config | description | example value | recommended value |
| --- | --- | --- | --- |
| endpointList | endpoint list | ["http://127.0.0.1:26657"] |  |
| gasPrice | gas price | 0.005untrn | |
| taskTicker | sleep duration in seconds | | 60 |
| poolAddr         | *generally required*,<br> but omitted if `runForEntrustedPool` is `true` | cosmos1hvuhdvw...huzjhg |  |
| stakeManagerAddr |  | neutron1rjr282...8rqm8y |  |
| keyringDir | keyring dir | ./keys  |  |
| keyringBackend | keyring backend | file  |  |
| keyName | key name |  |  |
| runForEntrustedPool | set this config to true only if you are one of the entrusted voters who are responsible to relay data for entrusted LSD pools | false | false |

# Native CosmWasm LSD Relay

Coming Soon, Stay tuned
