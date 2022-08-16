import { createContext, useState } from 'react';
import { authenticateUser } from '../apiCalls/authenticateUser';

interface UserLoggedDataProps
{
    isLogged: boolean;
    userLogged: any;
    updateUserInfo: () => Promise<void>;
    setUserLogged: (value: any) => void;
    lastTransaction: any;
    setLastTransaction: (value: any) => void;
}

const UserLoggedDataContext = createContext({} as UserLoggedDataProps);

function UserLoggedDataProvider (props: { children: React.ReactNode })
{
    const [ userLogged, setUserLogged ] = useState({} as any);
    const [ lastTransaction, setLastTransaction ] = useState({} as any);

    async function updateUserInfo ()
    {
        if (!userLogged) return;

        const result = await authenticateUser(userLogged.client.cpf, userLogged.account.password);
        result.data.account.password = userLogged.account.password;
        setUserLogged(result.data);
    }

    return (
        <UserLoggedDataContext.Provider value=
            {
                {
                    isLogged: Boolean(Object.keys(userLogged).length),
                    userLogged,
                    updateUserInfo,
                    setUserLogged,
                    lastTransaction,
                    setLastTransaction
                } as UserLoggedDataProps
            }>
            {props.children}
        </UserLoggedDataContext.Provider>
    );
}

export { UserLoggedDataProvider, UserLoggedDataContext };
export type { UserLoggedDataProps };
