import { TransactionObject, TransactionsWithDate } from '../../pages/ExtractPage';

interface PropTypes
{
    className?: string;
    statements: {errorMessage?: string, transactions: TransactionsWithDate};
}

const transactionType: { [index: string]: string } =
{
    DEPOSITO: 'Depósito',
    TAXA_DE_DEPOSITO: 'Taxa de Depósito',
    SAQUE: 'Saque',
    TAXA_DE_SAQUE: 'Taxa de Saque',
    ENVIO_TRANSFERENCIA: 'Transferência enviada',
    RECEBIMENTO_TRANSFERENCIA: 'Transferência recebida',
    TAXA_DE_TRANSFERENCIA: 'Taxa de Transferência',
};

function makeTransactionComponent (transaction: TransactionObject)
{
    const line = (transaction.ammount >= 0 ? '+' : '') + (transaction.ammount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });

    return (
        <li key={transaction.transactionID} className="flex justify-between px-2.5 font-medium text-sm text-[#A8A8A8]" >
            <span>{transactionType[transaction.type]}</span>
            <span className={`${transaction.ammount >= 0 ? 'text-[#53D496]' : 'text-[#FF5959]'} font-bold`}>
                {line}
            </span>
        </li>
    );
}

function ExtractDataComponent (props: PropTypes)
{
    if (props.statements.errorMessage || !props.statements.transactions) return props.statements.errorMessage;

    return Object.keys(props.statements.transactions).map((date) => (
        <ul key={date} className={`bg-[#F3F9F9] p-1 pr-2.5 rounded ${props.className ? props.className : ''}`}>
            <p className="text-[#727272] font-medium text-sm">{date}</p>
            {props.statements.transactions[date].map(makeTransactionComponent)}
        </ul>
    ));
}

function ExtractDataBox (props: PropTypes)
{
    return (
        <div className="w-full h-52 overflow-y-scroll">
            { ExtractDataComponent(props) }
        </div>
    );
}

export { ExtractDataBox };
