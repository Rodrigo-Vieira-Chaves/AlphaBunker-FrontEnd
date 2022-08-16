import { Icon } from '../Icon';
import { MainMenuBackGround } from './MainMenuBackGround';
import { MainMenuButton } from './MainMenuButton';
import { UserLoggedDataContext } from '../../providers/UserLoggedDataProvider';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function MainMenu ()
{
    const navigate = useNavigate();
    const userInfo = useContext(UserLoggedDataContext);

    const branch = `${userInfo.userLogged.account.branch}-${userInfo.userLogged.account.branchDigit}`;
    const account = `${userInfo.userLogged.account.accountNumber}-${userInfo.userLogged.account.accountNumberDigit}`;

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
            <div className="absolute top-[80%] flex flex-col bg-white rounded-[10px] w-[85%] pt-2 pb-3.5 px-4 shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
                <div className="flex justify-center gap-3.5">
                    <p className="text-[#C98E26] font-medium text-sm">{`Agência: ${branch}`}</p>
                    <p className="text-[#C98E26] font-medium text-sm">{`Conta: ${account}`}</p>
                    <Icon iconName="CaretDown" size={24} color="#777777" />
                </div>
                <div className="flex justify-start items-center ml-3 gap-1.5">
                    <Icon iconName="Eye" size={16} color="#777777" />
                    <div className="flex justify-start items-end gap-1">
                        <p className="text-[#338896] font-bold text-2xl">
                            {
                                new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(userInfo.userLogged.account.balance)
                                    .replace('R$', '')
                            }</p>
                        <p className="text-[#3FA7B8] font-bold text-sm">R$</p>
                    </div>
                </div>
            </div>
        </MainMenuBackGround>
    );
}

export { MainMenu };
