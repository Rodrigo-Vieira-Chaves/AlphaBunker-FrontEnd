import { UserLoggedDataProps } from '../providers/UserLoggedDataProvider';

interface DestinationAccount
{
    clientCPF: string,
    account:
    {
        branch: number,
        branchDigit: number,
        accountNumber: number,
        accountNumberDigit: number
    }
}

async function makeTransfer (ammount: number, userInfo: UserLoggedDataProps, destination: DestinationAccount, password: string)
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
                password
            }
        },
        destination
    };

    const fetchResponse = await fetch(
        'http://localhost:8000/makeTransfer',
        {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }
    );

    const responseJson = await fetchResponse.json();

    return responseJson;
}

export { makeTransfer };
