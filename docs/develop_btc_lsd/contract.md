# Contract

Smart contract is the core component of the BTC LSD Stack, and comprised of two contracts: [StakeManager](https://github.com/stafiprotocol/babylon-lsd-contracts/tree/main/contracts/stake_manager) and [LSD token](https://github.com/stafiprotocol/babylon-lsd-contracts/tree/main/contracts/lsd_token). `Lsd token` is a [cw20_base](https://github.com/CosmWasm/cw-plus/tree/main/contracts/cw20-base) compatible contract, users get LST after staking and it will be burnt after unstaking. 

The core part of StaFi EVM LSD Stack is a set of smart contracts, which are divided into two parts: PlatformContract, a platform contract managed by 61 Lab, and ProjectContracts, which belong to different projects. Platform contracts are common dependencies for all projects. Via platform contracts, developers or start-up projects can easily deploy and initialize their contract groups，distribute staking rewards.

Core contracts:

LsdToken: an ERC-20 compatible derived token. Users receive this token when depositing target chain NST(abbr for Native Staking Token) to StakeManager and burn it when unstaking.
StakePool: do delegation stuff with selected validators
StakeManager: keep track of pools' states, interact with users, other routine works

## StakeManager