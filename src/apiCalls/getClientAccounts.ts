async function getClientAccounts (clientID: string)
{
    const response = await fetch(`http://localhost:8000/getClientAccounts/${clientID}`, { method: 'GET' });
    const result = await response.json();

    return result;
}

export { getClientAccounts };
