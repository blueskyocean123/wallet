import './BtcOpen.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { useContext } from 'react';
import { encryptWithAES } from '../../service/utils';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const BtcOpen = async () => {
    const context = useContext(UserContext);
    const { password } = context;
    const [newValue, setNewValue] = useState('');
    const [confirmValue, setConfirmValue] = useState('');
    const navigate = useNavigate();
    let isWalletExist = localStorage.getItem('BTC_Private_Key');

    const createWallet = () => {
        if (newValue != confirmValue) alert('no confirmed');
        else {
            context.password = newValue;
            axios.post('http://localhost:5000/create').then((res) => {
                console.log(res.data);
                localStorage.setItem('BTC_Private_Key', encryptWithAES(res.data.wallet.privatekey, newValue));
                localStorage.setItem('BTC_Wallet_Address', encryptWithAES(res.data.wallet.address, newValue));
                localStorage.setItem('BTC_Balance', 0);
                console.log(res.data.wallet.privateKey);
                navigate('/btc/wallet');
            });
        }
    };
    const enterPassword = () => {
        context.password = newValue;
        navigate('/btc/wallet');
    };
    
    return (
        <div className='layout'>
            <Header />
            <section className='btcopencards'>
                <div className='btcopencard'>
                    {!isWalletExist ? <h3>Create Your Password</h3> : <h3>Enter Your Password</h3>}
                    <br/>
                    <input
                        type='password'
                        required
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        name='value'
                        placeholder='New Password (8 characters min)'
                    />
                    {!isWalletExist ? (
                        <>
                            <input
                                type='password'
                                required
                                value={confirmValue}
                                onChange={(e) => setConfirmValue(e.target.value)}
                                name='value'
                                placeholder='Confirm Password'
                            />
                            <br />
                            <p>Please Keep Your Password Safely.</p>
                            <br />
                            <button onClick={createWallet}>Create</button>
                        </>
                    ) : (
                        <>
                            <br />
                            <p>Please Keep Your Password Safely.</p>
                            <br />
                            <button onClick={enterPassword}>Enter</button>
                        </>
                    )}
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default BtcOpen;
