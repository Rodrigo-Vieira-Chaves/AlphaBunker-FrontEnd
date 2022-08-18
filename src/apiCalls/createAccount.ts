async function createAccount (name: string, birthday: string, email: string, cpf: string, password: string)
{
    const body =
    {
        client:
            {
                name,
                birthday,
                email,
                cpf
            },
        password
    };

    const fetchResponse = await fetch(
        'http://localhost:8000/createAccount',
        {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }
    );

    const responseJson = await fetchResponse.json();

    return responseJson;
}

export { createAccount };
