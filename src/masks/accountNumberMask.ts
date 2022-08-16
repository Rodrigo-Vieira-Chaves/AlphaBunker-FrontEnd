function accountNumberMask (value: string)
{
    return value
        .replace(/\D/g, '')
        .replace(/(\d{1,8})(\d)/, '$1-$2');
}

export { accountNumberMask };
