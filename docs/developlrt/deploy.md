# Deploy a LRT project

This guide provides a step-by-step script to deploy a LRT project through StaFi LRT Stack, without knowing details about contracts and services. Read the documentation for comprehensive understandings of these components.

## Step1. Deploy your LRT network contacts

61 Lab have made [StaFi LSAAS platform](https://stack-test-app.stafi.io/) for project parties to deploy their LRT network contracts.

![](/image/el_lrt/onboarding_homepage.png "StaFi LSAAS platform")

### Parameter Tips

Owner Address: sets the owner of the LRT network being created.

Owner Permissions:
- Upgrade contracts
- Adjust commission fee
- Adjust duration of era
- Manage supported LSTs

Operator Address:
- Must be registered operator on EigenLayer
- Go and find operator on [Holesky Operator list](https://holesky.eigenlayer.xyz/operator) or [Mainnet Operator list](https://app.eigenlayer.xyz/operator) depending on the network you want to deploy to

### Which Token Type should I choose?

Standard LRD Token:
- Provided by StaFi Stack
- ERC-20 compatible
- Ready to use

Several Procedures required before using Custom LRT:
1. Implement your own LRT logic which comply with Stack's standards.
2. Deploy your contract
3. Request StaFi Stack Team for whitelisting your token for security reason

### Why LRD Token could not be changed?
As being the heart of the LRT network, LRD token must be stable, reliable and trustable. Users hold LRD Token as a receipt of staking so it could not be changed.

### Rewards Distribution

Rewards distribution is crucial to project parties. Commission fee of users is set default as 10% and StaFi Stack fee is 10% of project income. for example, if `100ETH` rewards received from EigenLayer, the distribution will be:

| Role | Amount | Formula |
|---------------|--------|-------|
|  Users        |  90ETH | 100ETH*(1-0.1)  |
|  Project      |  9ETH  | (100ETH-90ETH)*(1-0.1)  |
|  StaFi Stack  |  1ETH  | 100ETH-90ETH-9ETH  |

### Save all the information generated

The lrd network has a set of smart contracts, so you should save all the information which you will interact frequently with, such as building your staking app, and running relay service.

- LRD Factory address
- Owner address
- Operator address
- LRT address
- Stake Pool address
- Stake Manager address

## Step2. Run relay service

### Install build tools

Install `make`, `gcc` and `git`

```bash
sudo apt update
sudo apt install -y make gcc git build-essential
```

Install `go` by following the [official docs](https://golang.org/doc/install). Remember to set your `$PATH` environment variable, for example:

```bash
cd $HOME
wget -O go1.22.0.linux-amd64.tar.gz https://go.dev/dl/go1.22.0.linux-amd64.tar.gz
rm -rf /usr/local/go && tar -C /usr/local -xzf go1.22.0.linux-amd64.tar.gz && rm go1.22.0.linux-amd64.tar.gz
echo 'export GOROOT=/usr/local/go' >> $HOME/.bashrc
echo 'export GOPATH=$HOME/go' >> $HOME/.bashrc
echo 'export GO111MODULE=on' >> $HOME/.bashrc
echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> $HOME/.bashrc && . $HOME/.bashrc
go version
```

### Install relay service

```bash
git clone https://github.com/stafiprotocol/lrd-relay.git
cd lrd-relay
make install
```

### Import account

Let's import your account to send transactions with contract.

```bash
lrd-relay import-account
```

### Start relay service

```bash
lrd-relay start --stake_manager 0x<your_stake_manager_address> \
    --account 0x<imported_account_address> \
    --endpoint http://127.0.0.1:8545 \
    --log_level info
```

## Step3. Build your own LRT app

[Follow this the doc to build your own LRT app](app.html)