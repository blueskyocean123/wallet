import { useEffect, useState } from 'react'
// import { ethers } from 'ethers'
import './Open.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const App = () => {
    const [newValue, setNewValue] = useState('');
    const [walletInfo, setWalletInfo] = useState('');
    const navigate = useNavigate();

    const openWallet = () => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:5000/open", {
                        password: newValue,
                        myWallet: walletInfo
                    }
                );
                console.log(response.data.wallet);
                localStorage.setItem('sendAddress', response.data.wallet.sendAddress);
                localStorage.setItem('privateKey', response.data.wallet.privateKey);
                localStorage.setItem('balance', response.data.wallet.balance);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
        navigate('/wallet');
    }

    useEffect(() => {
        setWalletInfo(localStorage.getItem('walletInfo'));
    }, [])

    return (
        <div className='layout'>
        <header className='navbar'>
            <div className='container'>
            <div className='logo'>Simple Storage</div>
            </div>
        </header>
        <div className='text'>
            <br/><br/>
            <h3>Import Your Password</h3> 
        </div>
        <section className='opencards'>            
            <div className='opencard'>
                <input
                    type='password'
                    required
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    name='value'
                    placeholder=''
                />
                <br />
                <p>Please keep your password safely.</p>
                <br />
                <button onClick={openWallet}>Open Your Wallet</button>
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