import { Navigate, Outlet } from 'react-router-dom';
import { AppBackground } from '../components/AppBackground';
import { MainMenu } from '../components/MainMenu/MainMenu';
import { UserLoggedDataContext } from '../providers/UserLoggedDataProvider';
import { useContext } from 'react';

function MainPage ()
{
    const userInfo = useContext(UserLoggedDataContext);

    return (
        userInfo.isLogged
            ? <AppBackground>
                <MainMenu />
                <Outlet />
            </AppBackground>
            : <Navigate to="/" replace />
    );
}

export { MainPage };
