import { Route, Routes } from 'react-router-dom';
import { DepositPage } from './pages/DepositPage';
import { ExtractPage } from './pages/ExtractPage';
import { LoginPage } from './pages/LoginPage';
import { MainPage } from './pages/MainPage';
import { ProfilePage } from './pages/ProfilePage';
import { ReceiptPage } from './pages/ReceiptPage';
import { RegisterPage } from './pages/RegisterPage';
import { TransferPage } from './pages/TransferPage';
import { WithdrawPage } from './pages/WithdrawPage';

function App ()
{
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/main" element={<MainPage />} >
                <Route path="extract" element={<ExtractPage />}/>
                <Route path="deposit" element={<DepositPage />}/>
                <Route path="withdraw" element={<WithdrawPage />}/>
                <Route path="transfer" element={<TransferPage />}/>
                <Route path="receipt" element={<ReceiptPage />}/>
            </Route>
        </Routes>
    );
}

export { App };
