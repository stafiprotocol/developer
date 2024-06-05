# Contract

The stack for EVM compatible chains consist of four contracts: 1. LsdNetworkFactory, an utility contract which deploys project contracts by a single call; 2. LsdToken, an ERC20-compatible token which represents users' receipt of their staking; 3. StakePool, delegates staking assets to selected validators 4. StakeManager, manages project internal and external states and interacts with users

It is challenging to implement a stack which can work for all EVM compatible chains, since every chain has its own unique features and designs. To address this, a polymorphic design is introduced: common functionalities form the bases, every chain specific LSD stack depends on the bases and develops its variants. So it is a hierarchical directory structure:

```bash
contracts
├── LsdToken.sol
├── Timelock.sol
├── bnb
│   ├── LsdNetworkFactory.sol
│   ├── StakeManager.sol
│   └── StakePool.sol
├── matic
│   ├── LsdNetworkFactory.sol
│   ├── StakeManager.sol
│   └── StakePool.sol
├── sei
│   ├── LsdNetworkFactory.sol
│   ├── StakeManager.sol
│   └── StakePool.sol
└── base
    ├── DelegationBalancer.sol
    ├── Era.sol
    ├── Errors.sol
    ├── Manager.sol
    ├── Ownable.sol
    ├── Protocol.sol
    ├── Rate.sol
    ├── StakePoolManager.sol
    └── UnstakePoolManager.sol
```

## LsdNetworkFactory.sol

An utility contract for launching new LSD networks with ease. Instead of deploying multiple contracts manually, you can just call `createLsdNetwork()` or `createLsdNetworkWithTimelock()` to deploy your own LSD network.

`createLsdNetwork()`
create a new LSD network with admin

It is a straightforward setup, full control over the network with a specified admin address, but lacks the security layer of timelock mechanism.

`event LsdNetwork()` will be emitted with the following struct, `NetworkContracts`.

**Parameters**:

- Provide the desired name and symbol for your LSD token.
- Specify the network administrator's address.
- Specify validator(s)

```solidity
function createLsdNetwork(
    string memory _lsdTokenName,
    string memory _lsdTokenSymbol,
    // The type of validator varies to different chains
    T memory _validators,
    address _networkAdmin
)

struct NetworkContracts {
    address _stakeManager;
    address _stakePool;
    address _lsdToken;
    uint256 _block;
}
```

`createLsdNetworkWithTimelock()`: create a new LSD network with `Timelock` admin

All functionality is as same as `createLsdNetwork` with TimeLock enabled. Changes will have a delay before they can be executed, preventing malicious activities.

**Parameters**:

- Provide the desired name and symbol for your LSD token.
- Specify validator(s).
- Define the minimum delay for the timelock.
- Specify the proposer addresses.

```solidity
function createLsdNetworkWithTimelock(
    string memory _lsdTokenName,
    string memory _lsdTokenSymbol,
    // The type of validator varies to different chains
    T memory _validators,
    uint256 _minDelay,
    address[] memory _proposers
)
```

`createLsdNetworkWithLsdToken()`: create a new LSD network with specified Lsd Token

This function gives platforms more flexibility to create their preferred flavor of LSD network. To prevent malicious LsdToken which may be harmful to the users, we introduce `authorizedLsdToken` concept, so only authorized LsdToken can be used.

`addAuthorizedLsdToken()`: authorize a new LsdToken contract

`lsdTokensOfCreater()`: retrieve all LSD tokens created by the creator

```solidity
lsdTokensOfCreater(address _creater) public view returns (address[] memory)
```

## LsdToken.sol

An ERC20-compatible token used to store and manage LSD Tokens. When users stake their assets they will receive equivalent LSD tokens(rToken) in return.

## StakePool.sol

StakePool contract interacts with chains' stake manager contract, specifically it does *delegation*, *undelegation*, *redelegation* and *rewards claiming* on behalf of the LSD project, and those functions can only be called by StakeManager contract.

- `delegate`: delegates assets to the chain. The function name could be *delegate* or *delegateMulti* according to the design of the chain. 

```solidity
// Sei
function delegateMulti(
    string[] memory _validators, uint256 _amount
) external onlyStakeManager {}

// BSC
function delegateMulti(
    address[] memory _validators, uint256 _amount
) external onlyStakeManager {}

// Polygon
function delegate(
    uint256 _validator, uint256 _amount
) external onlyStakeManager returns (uint256) {}
```

&nbsp;
- `undelegate`: undelegates assets with the chain. The function name could be *undelegate* or *undelegateMulti* according to the design of the chain. 

```solidity
// Sei
function undelegateMulti(
    string[] memory _validators, uint256 _amount
) external onlyStakeManager {}

// BSC
function undelegateMulti(
    address[] memory _validators, uint256 _amount
) external onlyStakeManager {}

// Polygon
function undelegate(
    uint256 _validator, uint256 _claimAmount
) external onlyStakeManager {}
```

&nbsp;
- `claim undelegation assets`: actively claim undelegation assets if the staking module of the chain do not distribute it automatically

```solidity
// Sei does not need this function 

// BSC
function claimUndelegated(
    address[] memory _validators
) external onlyStakeManager {}

// Polygon
function unstakeClaimTokens(
    uint256 _validator, uint256 _claimedNonce
) external onlyStakeManager returns (uint256) {}
```

&nbsp;
- `redelegate`: redelegates some amount of assets from the srcValidator to the dstValidator

```solidity
// Sei
function redelegate(
        string memory _validatorSrc,
        string memory _validatorDst,
        uint256 _amount
) external onlyStakeManager {}

// BSC
function redelegate(
    address _validatorSrc,
    address _validatorDst,
    uint256 _amount
) external payable onlyStakeManager {}

// Polygon
function redelegate(
    uint256 _fromValidatorId,
    uint256 _toValidatorId,
    uint256 _amount
) external onlyStakeManager {}
```

&nbsp;
- `withdraw rewards`: actively claim rewards if the staking module of the chain do not distribute it automatically

```solidity
// Sei
function withdrawDelegationRewardsMulti(
    string[] memory _validators
) external onlyStakeManager returns (uint256) {}

// BSC does not need this function

// Polygon
function checkAndWithdrawRewards(
    uint256[] _validators
) external onlyStakeManager returns (uint256) {}
```

&nbsp;
- `transfer unstake to unstakers`: transfer assets to unstakers after their unbonding period

```solidity
// Sei
function withdrawForStaker(
    address _staker, uint256 _amount
) external onlyStakeManager {}

// BSC
function withdrawForStaker(
    address _staker, uint256 _amount
) external onlyStakeManager {}

// Polygon
function withdrawForStaker(
    address _erc20TokenAddress, address _staker, uint256 _amount
) external onlyStakeManager {}
```

## StakeManager.sol

TBD

# Notable Parameters

Platforms inevitably have their own parameters. We've compiled a list of the most significant ones that you might consider adjusting.

|  config | description  | recommended value |
|---|---|---|
| address admin    | an account who administrate the whole network | we suggest platform use multi-sig account for security reason |
TBD