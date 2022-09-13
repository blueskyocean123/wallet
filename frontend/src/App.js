// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter } from 'react-router-dom';
import BaseRoutes from './routes/BaseRoutes';

function App() {
    return (
        <BrowserRouter>
            <BaseRoutes />
        </BrowserRouter>
    );
}

export default App;
