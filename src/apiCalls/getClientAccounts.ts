import { UserDataProps } from '../providers/UserDataProvider';
import { checkIfTokenIsExpired } from '../utils/checkIfTokenIsExpired';

async function getClientAccounts (userInfo: UserDataProps)
{
    const cpf = userInfo.userLogged.client.cpf;
    const token = userInfo.userLogged.token;

    const response = await fetch(`http://localhost:8000/getClientAccounts/${cpf}`, { method: 'GET', headers: { 'Authorization': `Bearer ${token}` } });
    const result = await response.json();

    checkIfTokenIsExpired(result.message, userInfo);

    return result;
}

export { getClientAccounts };
