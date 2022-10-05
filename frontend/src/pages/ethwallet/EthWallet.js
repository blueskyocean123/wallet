//password: asd
import React, { useState, useEffect, useContext } from 'react';
import etherLogo from '../../ether_logo.png';
import './EthWallet.css';
import { UserContext } from '../../App';
import { decryptWithAES } from '../../service/utils';
import { getBlackList } from '../../service/contract_api';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const ethers = require('ethers');

function MainPage() {
    const context = useContext(UserContext);
    const { password } = context;
    const [balance, setBalance] = useState('0');
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState(0);
    const [transactions, setTransactions] = useState([]);

    const gasFee = 5000;
    const Confirmations = 1;
    const network = 'goerli';
    const privateKey = localStorage.getItem('ETH_Private_Key');

    let provider = new ethers.providers.EtherscanProvider(
        network,
        'FNEQ5NPS4E1DMTCREUQW3RP3Y8ZXJVJEVY'
    );

    const navigate = useNavigate();

    useEffect(() => {
        if (password === '') navigate('/eth/open');
        else {
            console.log(password);
            // Create a wallet instance
            let addr = decryptWithAES(localStorage.getItem('ETH_Wallet_Address'), password);
            if (addr === '') {
                alert('Invalid password');
                navigate('/eth/open');
            } else {
                provider.getHistory(addr).then((history) => {
                    let txArray = [];
                    history.map((tx) => {
                        let buffer = {
                            hash: tx.hash,
                            address: tx.to,
                            amount: ethers.utils.formatEther(tx.value),
                            status: tx.confirmations > 1 ? 'Confirmed' : 'Uncofirmed',
                        };
                        txArray.push(buffer);
                    });
                    setTransactions(txArray);
                });
                provider.getBalance(addr).then((data) => {
                    setBalance(ethers.utils.formatEther(data).slice(0, 10));
                });
            }
        }
    }, []);

    function sendEther(privateKey, receiverAddress, amountInEther) {
        // Create a wallet instance
        let wallet = new ethers.Wallet(privateKey, provider);

        // Create a transaction object
        let tx = {
            to: receiverAddress,
            // Convert currency unit from ether to wei
            value: ethers.utils.parseEther(amountInEther),
            gasLimit: 50000,
        };

        // Send a transaction
        wallet
            .sendTransaction(tx)
            .then((txObj) => {
                console.log('txHash', txObj.hash);
                setTransactions((current) => [
                    ...transactions,
                    {
                        hash: txObj.hash,
                        address: receiverAddress,
                        amount: amountInEther,
                        status: 'Unconfirmed',
                    },
                ]);

                provider.waitForTransaction(txObj.hash, Confirmations).then(() => {
                    // console.log(transactions);
                    setTransactions((current) =>
                        current.filter((element) => {
                            return element !== txObj.hash;
                        })
                    );
                    setTransactions((current) => [
                        ...transactions,
                        {
                            address: receiverAddress,
                            hash: txObj.hash,
                            amount: amountInEther,
                            status: 'Confirmed',
                        },
                    ]);
                });
            })
            .catch((err) => {
                if (err.toString().includes('insufficient funds for intrinsic transaction cost'))
                    alert(`You don't have enough ethers`);
                else if (
                    err.toString().includes('bad address checksum') ||
                    err.toString().includes('invalid address')
                )
                    alert('Invalid Address');
                else if (err.toString().includes('invalid arrayify value'))
                    alert('Enter valid amount');
                else alert(err);
            });
    }

    return (
        <div className='layout'>
            <Header />
            <section className='ethmainframes'>
                <div className='ethmainframe'>
                    <h1>ETH Balance : {balance} tETH</h1>
                    <br/>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            const recipient_address = recipient.value;
                            const transfer_amount = amount.value;
                            const blacklist = getBlackList();
                            blacklist.then((data) => {
                                let isBlacklisted = false;
                                data.forEach((element) => {
                                    if (element == recipient_address) {
                                        isBlacklisted = true;
                                    }
                                });
                                if (!isBlacklisted) {
                                    sendEther(
                                        decryptWithAES(privateKey, password),
                                        recipient_address,
                                        transfer_amount
                                    );
                                } else {
                                    alert('Recipient address is blacklisted!');
                                }
                            });
                        }}
                    >
                        <input
                            id='recipient'
                            type='text'
                            ref={(input) => {
                                setRecipient(input);
                            }}
                            placeholder='Recipient Address'
                            required
                        />                        
                        <input
                            id='amount'
                            type='text'
                            ref={(input) => {
                                setAmount(input);
                            }}
                            placeholder='Amount'
                            required
                        />
                        <br/><br/>
                        <button
                            type='submit'
                        >
                            Send
                        </button>
                    </form>
                    <br/>
                    <h2>Transactions</h2>
                    <table className='table mt-3 string'>
                        <thead>
                            <tr>
                                <th scope='col'><h5>Hash</h5></th>
                                <th scope='col'><h5>Recipient</h5></th>
                                <th scope='col'><h5>Value</h5></th>
                                <th scope='col'><h5>Status</h5></th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((tx, key) => {
                                if (key + 10 > transactions.length) {
                                    return (
                                        <tr key={key}>
                                            <td>{tx.hash}</td>
                                            <td>{tx.address}</td>
                                            <td>{tx.amount}</td>
                                            <td>{tx.status}</td>
                                        </tr>
                                    );
                                }
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
            <Footer /> 
        </div>
    );
}

export default MainPage;
