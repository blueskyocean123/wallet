import "./EthOpen.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { useContext } from "react";
import { encryptWithAES } from "../../service/utils";
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const PasswordPage = () => {
    const context = useContext(UserContext);
    const { password } = context;
    const [newValue, setNewValue] = useState("");
    const [confirmValue, setConfirmValue] = useState("");
    let isWalletExist = localStorage.getItem("ETH_Private_Key");
    const navigate = useNavigate();

    const createWallet = () => {
        if (newValue != confirmValue) alert("no confirmed");
        else {
            context.password = newValue;
            axios.get("http://localhost:3001/api/create-wallet").then((res) => {
                console.log(res.data);
                localStorage.setItem("ETH_Private_Key", encryptWithAES(res.data.privateKey, newValue));
                localStorage.setItem("ETH_Wallet_Address", encryptWithAES(res.data.address, newValue));
                console.log(res.data.address);
                navigate("/eth/wallet");
            });
            // console.log(password);
        }
    };

    const enterPassword = () => {
        context.password = newValue;
        navigate("/eth/wallet");
    };
    
    return (
        <div className="layout">
            <Header />
            <section className="ethopencards">
                <div className="ethopencard">
                    {!isWalletExist ? <h3>Create Your Password</h3> : <h3>Enter Your Password</h3>}
                    <br/>
                    <input
                        type="password"
                        required
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        name="value"
                        placeholder="New Password (8 characters min)"
                    />
                    {!isWalletExist ? (
                        <>
                            <input
                                type="password"
                                required
                                value={confirmValue}
                                onChange={(e) => setConfirmValue(e.target.value)}
                                name="value"
                                placeholder="Confirm Password"
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

export default PasswordPage;
