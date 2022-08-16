import { formatDate } from './formatDate';

function formatDateWithTime (unixTimestamp: number)
{
    const dateFormatted = formatDate(unixTimestamp);

    const date = new Date(unixTimestamp);
    const hour = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${dateFormatted} ${hour}:${minutes}`;
}

export { formatDateWithTime };
