import { useEffect, useState } from 'react'
// import { ethers } from 'ethers'
import './Wallet.css';
import axios from 'axios';

const App = () => {
    const [value, setValue] = useState(0);
    const [receiveAddress, setReceiveAddress] = useState('');
    const [sendAddress, setSendAddress] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [balance, setBalance] = useState(0);

    const transfer = () => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:5000/send", {
                        sendAmount: value,
                        sendAddress: sendAddress,
                        privateKey: privateKey,
                        receiveAddress: receiveAddress
                    }
                );
                console.log(response.data.balance);
                setBalance(response.data.balance);
                localStorage.setItem('balance', response.data.balance);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }

    useEffect(() => {
        // setWalletInfo(localStorage.getItem('walletInfo'));
        setSendAddress(localStorage.getItem('sendAddress'));
        setPrivateKey(localStorage.getItem('privateKey'));
        setBalance(localStorage.getItem('balance'));
    }, [balance])

    return (
        <div className='layout'>
        <header className='navbar'>
            <div className='container'>
            <div className='logo'>Simple Storage</div>
            </div>
        </header>
        <section className='importcards'>            
            <div className='importcard'>
                <h1>Your balance : {balance / 100000000} tBTC</h1>
                <br/>
                <p>Please Enter Value To Transfer</p>
                <br/>
                <input
                    type='text'
                    required
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    name='value'
                    placeholder=''
                />
                <br/>
                <p>Please Enter Address To Receive Currency</p>
                <br/>
                <input
                    type='text'
                    required
                    value={receiveAddress}
                    onChange={(e) => setReceiveAddress(e.target.value)}
                    name='address'
                    placeholder=''
                />
                <br/>
                <p>Please Confirm Receiver Address</p>
                <br/><br/>
                <button onClick={transfer}>Transfer</button>
            </div>           
        </section>
        <footer>
            <div className='container'>
            0 gwei &bull; 2
            </div>
        </footer>
        </div>
    )
}

export default App