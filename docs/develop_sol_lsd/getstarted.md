# Get Started

Solana LSD Stack is devoted to help developers building liquid staking project and designed to provide a comprehensive set of solutions related to commission fee management, validator set management, and user operations: stake, unstake, withdraw.

## Contracts

Through the contracts provided by StaFi, project parties can create stake manager account and related accounts. These accounts are not only essential for a LSD project that records all the states of the project, such as: selected validator set, the rate between LST and SOL and commission fee etc, but also the dependence of Relay service and LSD dApp.

## LSD Relay Service

After creating the accounts, you'll need to deploy the relay service. The relay service operates off-chain and requires these addresses to work properly.

It provides functionality to generate related key pairs based on account private keys. It triggers the smart contract to handle new era process: bond, unbond, update_active and update_rate etc.


## LSD dApp

Once the LSD accounts created, you can deploy the LSD dApp for users to stake, unstake, withdraw and get the latest information about the project party.
