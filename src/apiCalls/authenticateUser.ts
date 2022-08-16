async function authenticateUser (cpf: string, password: string)
{
    const params = new URLSearchParams({ cpf, password });

    const response = await fetch(`http://localhost:8000/authenticateClient?${params}`, { method: 'GET' });
    const result = await response.json();

    return result;
}

export { authenticateUser };
