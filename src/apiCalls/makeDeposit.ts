import { UserLoggedDataProps } from '../providers/UserLoggedDataProvider';

async function makeDeposit (ammount: number, userInfo: UserLoggedDataProps)
{
    const body =
    {
        ammount,
        source:
        {
            clientCPF: userInfo.userLogged.client.cpf,
            account:
            {
                branch: userInfo.userLogged.account.branch,
                branchDigit: userInfo.userLogged.account.branchDigit,
                accountNumber: userInfo.userLogged.account.accountNumber,
                accountNumberDigit: userInfo.userLogged.account.accountNumberDigit,
            }
        }
    };

    const fetchResponse = await fetch(
        'http://localhost:8000/makeDeposit',
        {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }
    );

    const responseJson = await fetchResponse.json();

    return responseJson;
}

export { makeDeposit };
