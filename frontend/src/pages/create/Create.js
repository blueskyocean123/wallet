import './Create.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const App = () => {
    const [newValue, setNewValue] = useState('');
    const [confirmValue, setConfirmValue] = useState('');
    const [walletInfo, setWalletInfo] = useState('');
    const navigate = useNavigate();

    const createWallet = () => {
        if (newValue == confirmValue) {
            const fetchData = async () => {
                try {
                    const response = await axios.post(
                        "http://localhost:5000/create", {
                            password: newValue
                        }
                    );
                    setWalletInfo(response.data.encrypt);
                } catch (e) {
                    console.log(e);
                }
            }
            fetchData();
            // navigate('/wallet');
        } else {
            alert("not confirmed");
        }
    }

    useEffect(() => {
        console.log("mounted");
        if (localStorage.getItem('walletInfo') != '') navigate('/open');
        else localStorage.setItem('walletInfo', walletInfo);
    }, [walletInfo]);

    return (
        <div className='layout'>
            <header className='navbar'>
                <div className='container'>
                <div className='logo'>Simple Storage</div>
                </div>
            </header>
            <div className='text'>
                <br/><br/>
                <h3>Create Your Password</h3> 
            </div>
            <section className='createcards'>
                <div className='createcard'>
                <input
                    type='password'
                    required
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    name='value'
                    placeholder='New Password (8 characters min)'
                />
                <br />
                <input
                    type='password'
                    required
                    value={confirmValue}
                    onChange={(e) => setConfirmValue(e.target.value)}
                    name='value'
                    placeholder='Confirm Password'
                />
                <br />
                <p>I have read and agree to the Terms of Use.</p>
                <br />
                <button onClick={createWallet}>Create Your Wallet</button>
                </div>
            </section>
        </div>
    )
}

export default App