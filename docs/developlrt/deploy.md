# Deploy a LRT project

This guide provides a step-by-step script to deploy a LRT project through StaFi LRT Stack, without knowing details about contracts and services. Read the documentation for comprehensive understandings of these components.

## Step1. Deploy your LRT network contacts

// Todo:


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