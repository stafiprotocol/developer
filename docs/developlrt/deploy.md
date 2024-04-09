# Deploy a LRT project

This guide provides a step-by-step script to deploy a LRT project through StaFi LRT Stack, without knowing details about contracts and services. Read the documentation for comprehensive understandings of these components.

## Step1. Deploy your LRT network contacts

// Todo:


## Step2. Run relay service

### Install build tools

```bash
$ git clone https://github.com/stafiprotocol/lrd-relay.git
$ cd lrd-relay
$ make install
```

### Import account

Let's import your account to send transactions with contract.

```bash
$ lrd-relay import-account
Enter private key:
>
password for key:
>
```

### Start relay services

```bash
$ lrd-relay start --stake_manager 0x<your_stake_manager_address> \
    --account 0x<imported_account_address> \
    --endpoint http://127.0.0.1:8545 \
    --log_level info
```

## Step3. Build your own LRT app

[Follow this the doc to build your own LRT app](app.html)