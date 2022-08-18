import { useContext, useState } from 'react';
import { Icon } from '../Icon';
import { UserLoggedDataContext } from '../../providers/UserLoggedDataProvider';

function MainMenuAccountInfoBox ()
{
    const userInfo = useContext(UserLoggedDataContext);
    const [ showBalance, setShowBalance ] = useState(true);

    const branch = `${userInfo.userLogged.account.branch}-${userInfo.userLogged.account.branchDigit}`;
    const account = `${userInfo.userLogged.account.accountNumber}-${userInfo.userLogged.account.accountNumberDigit}`;

    function changeShowBalance ()
    {
        setShowBalance(!showBalance);
    }

    return (
        <div className="absolute top-[80%] flex flex-col bg-white rounded-[10px] w-[85%] pt-2 pb-3.5 px-4 shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
            <div className="flex justify-center gap-3.5">
                <p className="text-[#C98E26] font-medium text-sm">{`Agência: ${branch}`}</p>
                <p className="text-[#C98E26] font-medium text-sm">{`Conta: ${account}`}</p>
                {/* <Icon iconName="CaretDown" size={24} color="#777777" /> */}
            </div>
            <div className="flex justify-start items-center ml-3 gap-1.5">
                {
                    showBalance
                        ? <Icon iconName="Eye" size={20} color="#777777" weight={true} onClick={changeShowBalance} />
                        : <Icon iconName="EyeSlash" size={20} color="#777777" weight={true}  onClick={changeShowBalance} />
                }
                <div className="flex justify-start items-end gap-1">
                    <p className="text-[#338896] font-bold text-2xl">
                        {
                            showBalance
                                ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(userInfo.userLogged.account.balance)
                                    .replace('R$', '') : '****,**'
                        }</p>
                    <p className="text-[#3FA7B8] font-bold text-sm">R$</p>
                </div>
            </div>
        </div>
    );
}

export { MainMenuAccountInfoBox };
