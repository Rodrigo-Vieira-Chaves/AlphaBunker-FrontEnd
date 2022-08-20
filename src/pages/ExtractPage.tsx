import { DataBox, DataBoxLabels } from '../components/DataBoxes/DataBox';
import { useContext, useEffect, useState } from 'react';
import { ExtractDataBox } from '../components/DataBoxes/ExtractDataBox';
import { UserDataContext } from '../providers/UserDataProvider';
import { formatDate } from '../utils/formatDate';
import { getStatements } from '../apiCalls/getStatements';

interface TransactionObject
{
    transactionID: string;
    type: string;
    ammount: number;
}

interface TransactionsWithDate
{
    [ date: string ]: TransactionObject[];
}

function organizeTransactions (transactionsParameter: any[])
{
    const transactions = Array.isArray(transactionsParameter) ? transactionsParameter : [ transactionsParameter ];

    const transactionsObject = {} as TransactionsWithDate;

    for (const transaction of transactions)
    {
        const date = formatDate(transaction.createdAt);

        if (Object.prototype.hasOwnProperty.call(transactionsObject, date)) transactionsObject[date].push(transaction);
        else transactionsObject[date] = [ transaction ];
    }

    return transactionsObject;
}

function ExtractPage ()
{
    const userInfo = useContext(UserDataContext);
    const [ transactions, setTransactions ] = useState({} as { errorMessage?: string, transactions: TransactionsWithDate });

    function prepareStatementObject (response: any)
    {
        if (response.message) setTransactions({ errorMessage: response.message, transactions: {} });
        if (response.data) setTransactions({ transactions: organizeTransactions(response.data as any[]) });
    }

    useEffect(() =>
    {
        getStatements(userInfo).then((response) => prepareStatementObject(response));
    }, []);

    return (
        <DataBox className="mt-24" label={DataBoxLabels.EXTRATO_DE_TRANSAÇOES} labelMarginBottom="mb-6">
            <ExtractDataBox statements={transactions} />
        </DataBox>
    );
}

export { ExtractPage };
export type { TransactionObject, TransactionsWithDate };
