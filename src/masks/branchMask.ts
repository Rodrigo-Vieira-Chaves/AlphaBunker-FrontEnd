function branchMask (value: string)
{
    return value
        .replace(/\D/g, '')
        .replace(/(\d{1,4})(\d)/, '$1-$2');
}

export { branchMask };
