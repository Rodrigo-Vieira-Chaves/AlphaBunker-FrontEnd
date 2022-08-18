function nameMask (value: string)
{
    return value.replace(/[\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g, '');
}

export { nameMask };
