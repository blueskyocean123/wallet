import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import Main from '../pages/main/Main';
import Open from '../pages/open/Open';
import Create from '../pages/create/Create';
import Wallet from '../pages/wallet/Wallet';

const BaseRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/main" element={<Main />} />
                <Route path="/create" element={<Create />} />
                <Route path="/open" element={<Open />} />
                <Route path="/wallet" element={<Wallet />} />
            </Routes>
        </>
        
    );
};

export default BaseRoutes;
