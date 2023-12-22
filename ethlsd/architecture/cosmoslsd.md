# Cosmos LSD

This module is mainly built for CosmosSDK based projects.

## Neutron

Neutron is a blockchain network that brings Smart Contracts into the Cosmos-family blockchains using CosmWasm. Neutron works with networks using the IBC protocol. Neutron security (block validation) is provided by the Cosmos Hub network using Interchain Security.

Interchain Security is a technology that allows Neutron to be secured by the validator set of the Cosmos Hub and does not have another separate validator set, particularly for the Neutron blockchain.

## CosmWasm Contract

The core part of Listake Cosmos LSD Stack is a set of CosmWasm smart contracts, CosmWasm is a smart contracting platform built for the Cosmos ecosystem. It's the Cosmos (Cosm) way of using WebAssembly (Wasm) hence the name. With platform contracts, developers or start-up projects can easily deploy and initialize their contracts and distribute staking rewards.

### StakeManager

StakeManager can create and initialize StakePool which is an ICA on the cosmos hub. When initializing, StakeManager will create an account via *register_interchain_account* on the cosmos hub. We call this account StakePool.

StakeManager contracts are responsible for processing user IBC transactions and interacting with rATOM contracts. Mint corresponds to rATOM and is the entry point for other functions such as unstake/withdraw.

### Era

The **`era`** is a crucial time unit within the StakeManager contract, used to manage reward distribution, delegation and undelegation operations, and interest rate adjustments. This helps ensure the contract's operation progresses smoothly according to predefined time cycles and provides users with a clear time framework to understand the status of their investments and rewards.

### rATOM

rATOM(Example of ATOM LST) is a group implementation of cw20 and cw20-ics20.

CW20 is a specification for fungible tokens based on CosmWasm. The name and design are loosely based on Ethereum's ERC20 standard, but many changes have been made.

cw20-ics20 is an IBC-enabled contract that allows us to send rATOM tokens from one chain over the standard ICS20 protocol to the bank module of another chain. In short, it lets us send our custom rATOM tokens with IBC and use them just like native tokens on other chains.

## Off-chain service

### Validator Selector

Under normal circumstances, the validator is determined by the project administrator, and the project or developer can also choose the advanced service Validator Selector, which selects the optimal validator according to the validator selection algorithm developed by Listake.

One solution is to implement an on-chain contract to run the validator's select strategy. The relay is to initiate the update after a certain interval. This solution will be more convenient for AppChains which has a few validators.

Considering that there are 180 bonded validators on Cosmos Hub, the on-chain query solution may consume a lot of gas, and an off-chain vote solution similar to EVM LSD Stack can be used.

**Select Strategy**

According to the validator's slashes and commission fee, Voters select validators to bind the StakePool or update current validators.

**Voters**

When creating a stake pool fetch the list of target chain validators, and

Monitor the validators list and update the StakePool validator balance the number of delegation amounts of different validators in different stake pools

**Vote contract**

This contract collects proposals from voters and updates StakeManager if the number of votes satisfies the vote threshold.

### New Era

- **Marking Time Periods**: The **`era`** serves as a marker for time periods within the contract, with each **`era`** representing a specific time cycle.
- **Reward and Fee Calculation**: At the beginning of each **`era`**, the contract calculates and distributes new rewards by querying the distribution module of the Comsos Hub via ICQ.
- **Handling Delegation and Undelegation**: In each new **`era`**, the contract checks the delegation (**`bond`**) and undelegation (**`unbond`**) statuses of each pool and performs corresponding delegation or undelegation operations accordingly.
- **Updating Pool States**: In each **`era`**, the contract updates the status of each pool, including active funds (**`active`**), delegated funds (**`bond`**), and undelegated funds (**`unbond`**), reflecting the latest status of each pool in the new **`era`**.
- **Updating Interest Rates**: The contract calculates new interest rates based on the total amount of active funds and the total supply of LSD tokens in each **`era`**.

## Contract Flow

### On Initialize

StakeManger registers the interchain account as StakePool

### User Deposit

1. The user calls the Stake method of the Neutron StakeManager contract via the IBC hook on the Cosmos Hub network and sends the corresponding amount of ATOM token
2. StakeManager receives the token and contract request and sends the user's IBC ATOM via IBC to the ICA account in Neutron.
3. The StakeManager Contract calls the rATOM Contract for the rATOM corresponding to the user's mint
4. In each era, the cross-chain transaction module will stake the user's ATOM received in the ICA account to the Cosmos Hub network (automatically triggered via off-chain services).

### Unstake Flow

1. The user calls the StakeManager contract unstake method.
2. StakeManager burns off the corresponding amount of rATOM in the rATOM contract based on the current ATOM/rATOM rate.
3. After the unbond period, users can withdraw their funds from Cosmos Hub using the "withdraw" method.

### Withdraw Flow

1. When the user unstake has elapsed for a period of time (Cosmos Hub defaults to 21 days), the user can withdraw the corresponding token.
2. The user calls the withdraw method of the StakeManager contract. The contract retrieves the corresponding assets in Cosmos Hub through the ICA account and sends them directly to the user's account in Cosmos Hub.

## LSM Integration

### LSM(Liquidity Staking Module)

LSM represents an opinionated design for adding liquid staking to the Cosmos SDK. Staked assets should be able to be converted into liquid staked assets without unbonding. Assets are expected to be minimally fungible. Assets have a denom of "cosmosvaloperxxxx[recordId]". Record ID is a pointer to a non-fungible asset that receives the rewards from the tokenized stake.

### Integration

To let users be able to stake LSM share tokens in Listake Cosmos LSD Stack, Listake Cosmos SDK will pack a series of messages in one transaction on the Cosmos Hub.

1. RedeemToken this untokenize user’s share token to token.
2. Redelegate to validator selected by Validator Selector
3. TokenizeShare re-tokenizes user’s delegation
4. OwnerTransfer transfers owner tokenized share record to Listake Cosmos LSD PoolAccount so that StakeManager can withdraw the user’s delegation reward
5. ShareTokenTransfer transfers the user’s share token to PoolAccount so that user can receive rATOM in return.

## Quick Duplicate

For any cosmos AppChain including Cosmos, you can directly deploy the Listake Cosmos LSD contract on Neutron, just modify the connect_id, because the connect_id determines a pair of source chain and target chain, and different projects only have different source chains and target chains.

But there are basic requirements for an ordinary app chain:

1. Support ICA, distribution, stake module
2. Reliable relay connects new projects and neutron to ensure connection

How to guarantee the income, the contract makes us basically do not need to change, the distribution and income calculation are all in the contract.

Consider adding the method of contract manager, but the change threshold is not much different from direct deployment.

## Monitor

The LSD Monitor off-chain program monitors the flow of large amounts of governance token receipt and large amounts of LsdToken minting and burning on the chain with notifications via email, SMS, phone, etc.

Considering the contract needs a fee to send interchain transactions, we should monitor the balance unless we use a native token reward as a fee.

## Circuit Break & Blacklist

Add a global settings contract. When emergencies occur, the administrator or a multiple-signature account with administrative authority can add some addresses to the blacklist, restrict or disable certain accounts, or even stop the whole LSD. This part is too sensitive, dangerous, centralized, and increases user concerns. The Stafi technical team strongly recommended not to customize this function.