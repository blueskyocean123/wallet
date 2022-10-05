//password: asd
import React, { useState, useEffect, useContext } from 'react';
import etherLogo from '../../ether_logo.png';
import './BtcWallet.css';
import { UserContext } from '../../App';
import { decryptWithAES } from '../../service/utils';
import { getBlackList } from '../../service/contract_api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';


function MainPage() {
    const context = useContext(UserContext);
    const { password } = context;
    const [balance, setBalance] = useState(0);
    const [receiveAddress, setReceiveAddress] = useState('');
    const [value, setValue] = useState();
    const [address, setAddress] = useState('');
    const [privateKey, setPrivateKey] = useState('');

    const gasFee = 5000;
    let myAddress = '';
    let priKey = '';

    const navigate = useNavigate();

    useEffect(() => {
        if (password === '') navigate('/btc/open');
        else {
            // Create a wallet instance
            myAddress = decryptWithAES(localStorage.getItem('BTC_Wallet_Address'), password);
            if (myAddress === '') {
                alert('Invalid password');
                navigate('/btc/open');
            } else {
                priKey = decryptWithAES(localStorage.getItem('BTC_Private_Key'), password);
                setAddress(myAddress);
                setPrivateKey(priKey);
                console.log(localStorage.getItem('BTC_Private_Key'));
                const fetchData = async () => {
                    try {
                        const response = await axios.post(
                            "http://localhost:5000/open", {
                                address: myAddress
                            }
                        );
                        setBalance(response.data.totalBalance);
                    } catch (e) {
                        console.log(e);
                    }
                }
                fetchData();                
            }
        }
    }, []);

    const transfer = () => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:5000/send", {
                        sendAmount: value,
                        sendAddress: address,
                        privateKey: privateKey,
                        receiveAddress: receiveAddress
                    }
                );
                await console.log(response.data.balance);
                await setBalance(response.data.balance);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }

    return (
        <div className='layout'>
            <Header />
            <section className='ethmainframes'>
                <div className='ethmainframe'>
                    <h1>BTC Balance : {balance/100000000} tBTC</h1>
                    <br/>
                    <input
                        id='recipient'
                        type='text'
                        value={receiveAddress}
                        onChange={(e) => setReceiveAddress(e.target.value)}
                        placeholder='Recipient Address'
                        required
                    />
                    <input
                        id='amount'
                        type='text'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder='Amount'
                        required
                    />
                    <br/><br/>
                    <button onClick={transfer}>
                        Transfer
                    </button>
                </div>
            </section>
            <Footer />  
        </div>
    );
}

export default MainPage;
