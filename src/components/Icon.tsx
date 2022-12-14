import { ArrowLeft, ArrowsLeftRight, Bank, CaretDown, DownloadSimple, Eye, EyeSlash, IconContext, IdentificationCard, Receipt, UploadSimple, UserCircle, Vault, X } from 'phosphor-react';

type IconName = 'ArrowLeft' | 'ArrowsLeftRight' | 'Bank' | 'DownloadSimple' | 'IdentificationCard' | 'Receipt' | 'UploadSimple' | 'UserCircle' | 'Vault' | 'CaretDown' | 'Eye' | 'EyeSlash' | 'X';

interface PropTypes
{
    iconName: IconName;
    size?: number;
    color?: string;
    weight?: boolean;
    onClick?: () => void;
}

const icons =
{
    ArrowLeft: <ArrowLeft />,
    ArrowsLeftRight: <ArrowsLeftRight />,
    Bank: <Bank />,
    DownloadSimple: <DownloadSimple />,
    IdentificationCard: <IdentificationCard />,
    Receipt: <Receipt />,
    UploadSimple: <UploadSimple />,
    UserCircle: <UserCircle />,
    Vault: <Vault />,
    CaretDown: <CaretDown />,
    Eye: <Eye />,
    EyeSlash: <EyeSlash />,
    // eslint-disable-next-line id-length
    X: <X />,
};

function Icon (props: PropTypes)
{
    function onClick (event: React.MouseEvent<SVGSVGElement, MouseEvent>)
    {
        event.preventDefault();
        if (props.onClick) props.onClick();
    }

    return (
        <IconContext.Provider value=
            {
                {
                    color: props.color ? props.color : 'white',
                    size: props.size ? props.size : 32,
                    weight: props.weight ? 'fill' : 'regular',
                    onClick: (event) => onClick (event)
                }
            }>
            {icons[props.iconName]}
        </IconContext.Provider>
    );
}

export { Icon };
export type { IconName };
