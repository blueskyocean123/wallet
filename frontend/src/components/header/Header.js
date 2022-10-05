import './Header.css';
import btcWalletImg from '../../assets/btcwallet.png';
import ethwalletImg from '../../assets/ethwallet.png';

const NavHeader = () => {
    return (
        <header className='navbar'>
            <div className='container'>
                <div className='logo'>Crypto Wallet</div>
                <div>
                    <img src={btcWalletImg} className='img-button' alt='btcwallet'/>
                    <img src={ethwalletImg} className='img-button' alt='ethwallet'/>
                </div>                    
            </div>
        </header>
    );
};

export default NavHeader;
