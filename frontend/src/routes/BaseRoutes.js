import { Route, Routes } from "react-router-dom";
import Landing from "../pages/landing/Landing";
import EthWallet from "../pages/ethwallet/EthWallet";
import EthOpen from "../pages/ethopen/EthOpen";
import BtcWallet from "../pages/btcwallet/BtcWallet";
import BtcOpen from "../pages/btcopen/BtcOpen";

const BaseRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/eth/wallet" element={<EthWallet />} />
                <Route path="/eth/open" element={<EthOpen />} />
                <Route path="/btc/wallet" element={<BtcWallet />} />
                <Route path="/btc/open" element={<BtcOpen />} />
            </Routes>
        </>
    );
};

export default BaseRoutes;
