import { BoxBackGround } from './BoxBackGround';
import { formatDateWithTime } from '../../utils/formatDateWithTime';

const transactionType: { [index: string]: string } =
{
    DEPOSITO: 'Depósito',
    SAQUE: 'Saque',
    ENVIO_TRANSFERENCIA: 'Transferência - Enviada'
};

interface PropTypes
{
    className?: string;
    destinyAccount?: any;
    type: string;
    ammount: number;
    createdAt: number;
}

function ReceiptDataBox (props: PropTypes)
{
    const line = (props.ammount >= 0 ? '+' : '') + (props.ammount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });

    const branch = `${props.destinyAccount?.account.branch}-${props.destinyAccount?.account.branchDigit}`;
    const account = `${props.destinyAccount?.account.accountNumber}-${props.destinyAccount?.account.accountNumberDigit}`;

    return (
        <BoxBackGround>
            <p className="text-[#727272]">Tipo: {transactionType[props.type]}</p>
            <p className="mt-4">Data: {formatDateWithTime(props.createdAt)}</p>
            {
                props.destinyAccount &&
                <div className="flex flex-col justify-center items-start w-full mt-4">
                    <p className="text-[#727272]">Dados de destino:</p>
                    <p className="ml-4">CPF: {props.destinyAccount.clientCPF}</p>
                    <p className="ml-4">Agência: {branch}</p>
                    <p className="ml-4">Conta: {account}</p>
                </div>
            }
            <div className="flex justify-between items-center w-full mt-4">
                <p className="text-[#727272]">Valor</p>
                <p className={`${props.ammount >= 0 ? 'text-[#53D496]' : 'text-[#FF5959]'} font-bold`}>{line}</p>
            </div>
        </BoxBackGround>
    );
}

export { ReceiptDataBox };
