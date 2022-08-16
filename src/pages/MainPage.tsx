import { Navigate, Outlet } from 'react-router-dom';
import { MainMenu } from '../components/MainMenu/MainMenu';
import { UserLoggedDataContext } from '../providers/UserLoggedDataProvider';
import { useContext } from 'react';

function MainPage ()
{
    const userInfo = useContext(UserLoggedDataContext);

    return (
        userInfo.isLogged
            ? <div className="flex flex-col items-center bg-[#EAEDF0] h-screen">
                <MainMenu />
                <Outlet />
            </div>
            : <Navigate to="/" replace />
    );
}

export { MainPage };
