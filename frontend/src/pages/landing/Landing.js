import './Landing.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className='layout'>
            <Header />
            <h3 className='topic'>We are happy to see you</h3>
            <section className='landcards'>                
                <div className='landcard'>
                    <h3>BTC Wallet</h3>
                    <br/>
                    <h5>Connecting You To Bitcoin Blockchain Platform.</h5>
                    <br/>
                    <button
                        onClick={() =>
                            navigate({
                                pathname: '/btc/open',
                            })
                        }
                    >
                        Open Wallet
                    </button>
                </div>
                <div className='landcard'>
                    <h3>ETH Wallet</h3>
                    <br/>
                    <h5>Connecting You To Ethereum Blockchain Platform.</h5>
                    <br/>
                    <button
                        onClick={() =>
                            navigate({
                                pathname: '/eth/open',
                            })
                        }
                    >
                        Open Wallet
                    </button>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Home;
