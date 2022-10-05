var express = require('express');
const axios = require('axios');
const bitcore = require('bitcore-lib');
const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');
const cryptocore = require('crypto-js');


exports.sendBitcoin = async (req, res) => {
    const receiveAddress = req.body.receiveAddress;
    const sendAmount = req.body.sendAmount;
    const privateKey = req.body.privateKey;
    const sendAddress = req.body.sendAddress;
    const sochain_network = 'BTCTEST';
    const satoshiToSend = sendAmount * 100000000;
    let fee = 0;
    console.log(req.body);
    let inputCount = 0; 
    let outputCount = 2;
    const utxos = await axios.get( 
        `https://sochain.com/api/v2/get_tx_unspent/${sochain_network}/${sendAddress}`
    ); 
    const transaction = new bitcore.Transaction();
    let totalAmount = 0;

    let inputs = [];
    utxos.data.data.txs.forEach(async (element) => {
        let utxo = {};
        utxo.satoshis = Math.floor(Number(element.value) * 100000000);
        utxo.script = element.script_hex;
        utxo.txId = element.txid;
        utxo.address = utxos.data.data.address;
        utxo.outputIndex = element.output_no;
        totalAmount += utxo.satoshis;
        inputCount += 1;
        inputs.push(utxo);
    });

    txSize = inputCount * 146 + outputCount * 34 + 10 - inputCount;
    
    fee = txSize * 20
    console.log(totalAmount);
    console.log(satoshiToSend);
    console.log(fee);
    if (totalAmount - satoshiToSend - fee  < 0) {
        throw new Error('Your balance is not enough for this transaction');
    }
    
    transaction.from(inputs);
    transaction.to(receiveAddress, satoshiToSend);
    transaction.change(sendAddress);
    transaction.fee(fee * 20);
    transaction.sign(privateKey);

    const serializedTransaction = transaction.serialize();
    const result = await axios({
        method: 'POST',
        url: `https://sochain.com/api/v2/send_tx/${sochain_network}`,
        data: {
            tx_hex: serializedTransaction,
        },
    });
    res.json({balance: totalAmount - satoshiToSend - fee}); 
}

exports.createWallet = async (req, res) => {
    //Define the network
    const network = bitcoin.networks.testnet; //use networks.bitcoin for mainnet
    let wallet = {
        address : '',
        privatekey : '',
        mnemonic : ''
    };
    // Derivation path
    const path = `m/49'/1'/0'/0`; // Use m/49'/0'/0'/0 for mainnet

    let mnemonic = bip39.generateMnemonic();
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    let root = bip32.fromSeed(seed, network);

    let account = root.derivePath(path);
    let node = account.derive(0).derive(0);

    let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
    }).address;

    console.log(`
        Wallet generated:
        - Address  : ${btcAddress},
        - Key : ${node.toWIF()},
        - Mnemonic : ${mnemonic}
    `);

    wallet.address = btcAddress;
    wallet.privatekey = node.toWIF();
    wallet.mnemonic = mnemonic;
    res.json({wallet});
}

exports.openWallet = async (req, res) => {
    const sochain_network = 'BTCTEST';    
    const address = req.body.address;
    console.log(req.body);
    const utxos = await axios.get(
        `https://sochain.com/api/v2/get_tx_unspent/${sochain_network}/${address}`
    );
    let totalBalance = 0;
    console.log(address);
    utxos.data.data.txs.forEach(async (element) => { 
        let utxo = {};
        utxo.satoshis = Math.floor(Number(element.value) * 100000000);
        utxo.script = element.script_hex;
        utxo.address = utxos.data.data.address;
        utxo.txId = element.txid;
        utxo.outputIndex = element.output_no;
        totalBalance += utxo.satoshis;
    });
    res.json({totalBalance});
}
