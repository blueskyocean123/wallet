import { Link } from "react-router-dom";
import axios from "axios";

export default function Landing() {
    function createWallet() {
        axios.get("http://localhost:3001/api/create-wallet").then((res) => {
            console.log(res.data);
        });
    }

    return (
        <>
            <h2>Landing</h2>
            <button onClick={createWallet}>Create Wallet</button>
        </>
    );
}
