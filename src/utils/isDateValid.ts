function isDateValid (date: string)
{
    const dateParts = date.split('/');
    const dateObject = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));

    return !isNaN(Number(dateObject));
}

export { isDateValid };
