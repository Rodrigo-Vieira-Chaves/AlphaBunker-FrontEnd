import { Icon } from '../Icon';
import { MainMenuAccountInfoBox } from './MainMenuAccountInfoBox';
import { MainMenuBackGround } from './MainMenuBackGround';
import { MainMenuButton } from './MainMenuButton';
import { UserLoggedDataContext } from '../../providers/UserLoggedDataProvider';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function MainMenu ()
{
    const navigate = useNavigate();
    const userInfo = useContext(UserLoggedDataContext);

    return (
        <MainMenuBackGround className="relative">
            <div className="flex justify-center items-center gap-16">
                <h1 className="text-white font-medium text-xl">Bem-vindo, {userInfo.userLogged.client.name}</h1>
                <Icon iconName="UserCircle" size={24} onClick={() => navigate('/profile')} />
            </div>
            <div className="flex justify-center gap-3 mt-7">
                <MainMenuButton iconName="Bank" label="Extrato" navigateTo="extract" />
                <MainMenuButton iconName="ArrowsLeftRight" label="Transferir" navigateTo="transfer"  />
                <MainMenuButton iconName="UploadSimple" label="Depositar" navigateTo="deposit"  />
                <MainMenuButton iconName="DownloadSimple" label="Sacar" navigateTo="withdraw"  />
            </div>
            <MainMenuAccountInfoBox />
        </MainMenuBackGround>
    );
}

export { MainMenu };
