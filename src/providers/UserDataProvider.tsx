import { createContext, useState } from 'react';
import { authenticateUser } from '../apiCalls/authenticateUser';

interface ClientDTO
{
    clientID?: string;
    name: string;
    birthday: string;
    email: string;
    cpf: string;
}

interface AccountDTO
{
    accountID?: string;
    clientID?: string;
    branch: number;
    branchDigit: number;
    accountNumber: number;
    accountNumberDigit: number;
    password?: string;
    balance?: number;
}

interface UserInfo
{
    client: ClientDTO;
    account: AccountDTO;
    token: string;
}

interface UserDataProps
{
    isLogged: boolean;
    userLogged: UserInfo;
    setUserLogged: (value: UserInfo) => void;
    updateUserLogged: () => Promise<void>;
    lastTransaction: any;
    setLastTransaction: (value: any) => void;
}

const UserDataContext = createContext({} as UserDataProps);

function UserDataProvider (props: { children: React.ReactNode })
{
    const [ userLogged, setUserLogged ] = useState({} as UserInfo);
    const [ lastTransaction, setLastTransaction ] = useState({} as any);

    async function updateUserLogged ()
    {
        if (!userLogged) return;

        const result = await authenticateUser(userLogged.client.cpf, userLogged.account.password as string);
        result.data.account.password = userLogged.account.password;
        setUserLogged(result.data);
    }

    return (
        <UserDataContext.Provider value=
            {
                {
                    isLogged: Boolean(Object.keys(userLogged).length),
                    userLogged,
                    setUserLogged,
                    updateUserLogged,
                    lastTransaction,
                    setLastTransaction
                } as UserDataProps
            }>
            {props.children}
        </UserDataContext.Provider>
    );
}

export { UserDataProvider, UserDataContext };
export type { UserDataProps, UserInfo };
