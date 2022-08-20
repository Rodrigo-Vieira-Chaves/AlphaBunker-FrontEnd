import { DataBox, DataBoxLabels } from '../components/DataBoxes/DataBox';
import { Navigate, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppBackground } from '../components/AppBackground';
import { BoxBackGround } from '../components/DataBoxes/BoxBackGround';
import { Icon } from '../components/Icon';
import { MainMenuBackGround } from '../components/MainMenu/MainMenuBackGround';
import { UserDataContext } from '../providers/UserDataProvider';
import { getClientAccounts } from '../apiCalls/getClientAccounts';

function ProfilePage ()
{
    const navigate = useNavigate();
    const userInfo = useContext(UserDataContext);
    const [ accountBoxes, setAccountBoxes ] = useState([] as JSX.Element[]);

    function makeAccountBoxes (accountsArray: any[])
    {
        let branchFormatted = '';
        let accountFormatted = '';

        const jsxElementsArray = [] as JSX.Element[];

        for (const account of accountsArray)
        {
            branchFormatted = `${account.branch}-${account.branchDigit}`;
            accountFormatted = `${account.accountNumber}-${account.accountNumberDigit}`;

            jsxElementsArray.push(
                <BoxBackGround key={account.accountID} className="text-[#727272]">
                    <p>Agência: {branchFormatted}</p>
                    <p>Conta: {accountFormatted}</p>
                </BoxBackGround>
            );
        }

        setAccountBoxes(jsxElementsArray);
    }

    async function getAllClientAccounts ()
    {
        const response = await getClientAccounts(userInfo);

        let accountsArray = [] as any[];

        if (Array.isArray(response.data)) accountsArray = response.data;
        else accountsArray.push(response.data);

        makeAccountBoxes(accountsArray);
    }

    useEffect(() =>
    {
        getAllClientAccounts();
    }, []);

    return (
        userInfo.isLogged
            ? <AppBackground>
                <MainMenuBackGround>
                    <div className="w-full pl-6">
                        <Icon iconName="ArrowLeft" onClick={() => navigate('/main/extract')} />
                    </div>
                    <Icon iconName="UserCircle" size={80} />
                    <h2 className="font-medium text-xl text-[#F7F7F7] mt-3">{userInfo.userLogged.client.name}</h2>
                </MainMenuBackGround>
                <DataBox className="mt-10" label={DataBoxLabels.MEUS_DADOS} labelMarginBottom="mb-6" >
                    <BoxBackGround className="text-[#727272]">
                        <p>Nome: {userInfo.userLogged.client.name}</p>
                        <p>Data de nascimento: {userInfo.userLogged.client.birthday.replaceAll('-', '/')}</p>
                        <p>CPF: {userInfo.userLogged.client.cpf}</p>
                    </BoxBackGround>
                </DataBox>
                <DataBox className="mt-9" label={DataBoxLabels.MINHAS_CONTAS_CORRENTES} labelMarginBottom="mb-6" >
                    <div className="flex flex-col gap-6 w-full h-28 overflow-y-scroll">
                        {accountBoxes}
                    </div>
                </DataBox>
            </AppBackground>
            : <Navigate to="/" replace />
    );
}

export { ProfilePage };
