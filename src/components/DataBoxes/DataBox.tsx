import { Icon } from '../Icon';

enum DataBoxLabels
{
    SAQUE = 'Saque',
    DEPOSITO = 'Depósito',
    MEUS_DADOS = 'Meus Dados',
    TRANSFERÊNCIA = 'Transferência',
    EXTRATO_DE_TRANSAÇOES = 'Extrato de transações',
    MINHAS_CONTAS_CORRENTES = 'Minhas contas correntes',
    COMPROVANTE_DE_TRANSAÇAO = 'Comprovante de transação'
}

function chooseIcon (label: DataBoxLabels)
{
    const color = '#C98E26';
    const size = 24;

    switch (label)
    {
        case DataBoxLabels.MEUS_DADOS: return <Icon iconName="IdentificationCard" size={size} color={color} />;
        case DataBoxLabels.MINHAS_CONTAS_CORRENTES: return <Icon iconName="Vault" size={size} color={color} />;
        case DataBoxLabels.EXTRATO_DE_TRANSAÇOES: return <Icon iconName="Bank" size={size} color={color} />;
        case DataBoxLabels.TRANSFERÊNCIA: return <Icon iconName="ArrowsLeftRight" size={size} color={color} />;
        case DataBoxLabels.DEPOSITO: return <Icon iconName="UploadSimple" size={size} color={color} />;
        case DataBoxLabels.SAQUE: return <Icon iconName="DownloadSimple" size={size} color={color} />;
        case DataBoxLabels.COMPROVANTE_DE_TRANSAÇAO: return <Icon iconName="Receipt" size={size} color={color} />;
        default: break;
    }
}

interface PropTypes{
    className?: string;
    label: DataBoxLabels;
    labelMarginBottom?: string;
    children: React.ReactNode;
}

function DataBox (props: PropTypes)
{
    return (
        <div className={`flex flex-col w-4/5 sm:w-1/2 sm:flex sm:justify-center sm:items-center bg-white 
                       dark:bg-[#23292C] dark:border dark:border-[#424245] px-4 py-3 rounded-lg ${props.className ? props.className : ''}`}>
            <div className="flex justify-start">
                {chooseIcon(props.label)}
                <p className={`text-[#C98E26] font-medium text-base ml-2.5 ${props.labelMarginBottom ? props.labelMarginBottom : ''}`}>{props.label}</p>
            </div>
            {props.children}
        </div>
    );
}

export { DataBox, DataBoxLabels };
