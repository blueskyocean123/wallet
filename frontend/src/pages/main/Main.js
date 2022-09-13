import './Main.css'
import { useNavigate } from 'react-router-dom'

const Main = () => {
    const navigate = useNavigate();

    return (
        <div className='layout'>
            <header className='navbar'>
                <div className='container'>
                    <div className='logo'>Simple Storage</div>
                </div>
            </header>
            <div className='text'>
                <br/><br/>
                <h3>New to Simple Storage?</h3> 
            </div>
            
            <section className='maincards'>
                <div className='maincard'>
                    <h2>Yes, Let's Get Set Up</h2>
                        <p>This will create a new wallet and Secret Recovery Phrase</p>
                        <br /><br />
                        <button onClick={() => navigate('/create')}>Create a Wallet</button>
                </div>
                <div className='maincard'>
                    <h2>No, I Already Have My Own Wallet</h2>
                    <form>
                        <p>Import your existing wallet using a Secret Recovery Phrase</p>
                        <br /><br />
                        <button onClick={() => navigate('/import')}>Import Wallet</button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Main