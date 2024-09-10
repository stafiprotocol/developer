# Contribution

This page describes a general approach on how to write a new module and to share it with the community.

## Before you start

Follow these steps to implement a new module:
1. Read the architecture and develop documentation to get a comprehensive understanding
1. Dive into smart contracts:
    - [BTC LSD Contracts](https://github.com/stafiprotocol/babylon-lsd-contracts)
    - [ETH LSD Contracts](https://github.com/stafiprotocol/eth-lsd-contracts)
    - [Solana LSD Contracts](https://github.com/stafiprotocol/solana-lsd-contracts)
    - [ETH LRT Contracts](https://github.com/stafiprotocol/lrd-contracts)
    - [EVM LSD Contracts](https://github.com/stafiprotocol/evm-lsd-contracts)
    - [Cosmos LSD Contracts](https://github.com/stafiprotocol/neutron-lsd-contracts)
1. Implement the logic
1. Contact StaFi team if you have any questions 
1. Write documentation 

## Share your module


StaFi team have made it easy for every community member to participate in contribution. You are encouraged to share your module with a pull request to [LSD Stack App](https://github.com/stafiprotocol/lsd-stack-app). You should prepare these information:
1. Name of your module
1. A short description 
1. Resources about the module 
1. Documentation link

Below is an example pull request. 

```diff
# filename: interfaces/common.ts
export enum ModuleType {
  Ai = 'ai',
  PointSystem = 'point',
+  Connext = 'connext',
}
```

```diff
# filename: config/modular/index.ts

export const modularConfigs = {
  externalModules: [
+   {
+     type: ModuleType.Connext,
+     title: 'Connext',
+     description:
+       'Connext protocol allows users to bridge funds and developers to build asynchronous Solidity for the first time!',
+     externalLink: 'https://www.connext.network/',
+     tutorialLink:
+       'https://lsaas-docs.stafi.io/docs/modules/l2_native_restaking_module.html',
+   },
  ],
  supportList: [
+   ModuleType.Connext,
  ]
}
```
