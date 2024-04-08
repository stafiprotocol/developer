# EVM LSD Stack

## Smart contracts

The core part of StaFi EVM LSD Stack is a set of smart contracts, which are divided into two parts: PlatformContract, a platform contract managed by 61 Lab, and ProjectContracts, which belong to different projects. Platform contracts are common dependencies for all projects. Via platform contracts, developers or start-up projects can easily deploy and initialize their contract groups，distribute staking rewards.

Core contracts:

- LsdToken: an ERC-20 compatible derived token. Users receive this token when depositing target chain NST(abbr for Native Staking Token) to StakeManager and burn it when unstaking.
- StakePool: do delegation stuff with selected validators
- StakeManager: keep track of pools' states, interact with users, other routine works

Core roles:

- Voter: privileged to propose changes to the on-chain status
- Owner: manages the whole network

![StaFi EVM LSD Architecture](/image/evmlsd_0.png 'StaFi EVM LSD Architecture')

## User Stake Flow

StakeManager contract provides stake method for users to participate staking. Different staking system has different ways to stake, such as BNB use native token as a staking token; MATIC use ERC-20 compatible token. We'll explore them one by one. Here is the formula for calculating the amount of LsdToken they will get.

`amountLsdToken = LsdTokenTotalSupply / TotalNetworkBalanceOfUsers * amountStakingToken`

### Scenario 1: Staking token is a Native Token

Native token can be sent with method calling, so users can invoke *stake* method accompanied with the amount of token they're willing to stake, and they will receive equivalent LsdToken in return.

![Stake Native Token Flow](/image/evmlsd_1.png 'Stake Native Token Flow')

### Scenario 2: Staking token is an ERC-20 compatible token

As staking token is an ERC-20 compatible token, users should approve StakeManager to spend their tokens, then they can stake it and receive equivalent LsdToken in return.

![Stake ERC-20 token Flow](/image/evmlsd_2.png 'Stake ERC-20 token Flow')

## User Unstake Flow

Any LsdToken holder is a valid user, and can unstake tokens. At first, users should approve StakeManager to spend their token, next call *StakeManager.unstake* method to burn their LsdToken, last get their rewards by calling withdraw method.

![User Unstake Flow](/image/evmlsd_3.png 'User Unstake Flow')

## Balance Staking Pools

The default balancer is the project administrator, it is able to transfer to another account. The owner of StakeManager should create a new StakePool contract when one staking pool reaches its staking maximum threshold, and then balancer route users' staking assets to different stake pools to keep the network in a health(well-balanced) status.

## Relay Service

Due to the limitation of smart contract, it could not launch an execution. So StaFi LSD Stack introduces Relay service, at a certain interval, it will trigger StakeManager to collect and calculate users' staking reward, distribute it to the project and users. The reward information could come from the target chain staking contract or provided by off-chain, and voters are responsible to submit these on chain.

Here is an example of how Polygon relay work, it does not have voter, as no data needed from Oracle:

![EVM LSD Relay Service](/image/evmlsd_4.png 'EVM LSD Relay Service')

As we know BNB chain is differ from Polygon, it requires data from Beacon chain. So we introduce voter role, to keep data correct. Voters submit their proposal through relay service.  below is BNB chain example:

![BNB chain Relay](/image/evmlsd_5.png 'BNB chain Relay')

## Validator Selector

Under normal circumstances, the validator is determined by the project administrator, and the project or developer can also choose the advanced service ValidatorSelector, which selects the optimal validator according to the validator selection algorithm developed by 61 Lab.

According to the validator's status, performance and commission fee, voters select validators to bind to the StakePool or update current validators.

For security, StakeManager has been designed as a multi-sig contract, the proposal will be carried out, only the number of voters over the threshold agreed on the same, such as change validator from A to B.

## Quick Duplicate

StaFi EVM LSD Stack provides mature LSD solutions including contracts, back-end services for popular blockchains like BSC, Polygon, etc.  However, for starting blockchain or layer 2 programs, the Stack also provides LSD API standards. A limited work developers should do is to wrap only one or two contracts or provide several blockchain RPC APIs according to the Stack API Standards.

![Quick Duplicate](/image/evmlsd_6.png 'Quick Duplicate')

## Alert

The LSD Monitor off-chain program monitors the flow of large amounts of governance token receipt and large amounts LsdToken minting and burning on the chain with notifications via email, SMS, phone, etc.

## Circuit Break & Blacklist

Add a global settings contract. When emergencies occur, the administrator or a multiple signature account with administrative authority  can add some addresses to the blacklist, restrict or disable certain accounts, or even stop the whole LSD. This part is too sensitive, dangerous, centralized, and increases user concerns. 61 Lab strongly recommended not to customize this function.