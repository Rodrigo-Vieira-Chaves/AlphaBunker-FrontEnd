import { Navigate, Outlet } from 'react-router-dom';
import { AppBackground } from '../components/AppBackground';
import { MainMenu } from '../components/MainMenu/MainMenu';
import { UserDataContext } from '../providers/UserDataProvider';
import { useContext } from 'react';

function MainPage ()
{
    const userInfo = useContext(UserDataContext);

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
