import { Icon, IconName } from '../Icon';
import { useNavigate } from 'react-router-dom';

interface PropTypes
{
    label: string;
    iconName: IconName;
    navigateTo: string;
}

function MainMenuButton (props: PropTypes)
{
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <button className="bg-[#75ACB1] rounded py-3 px-3.5" onClick={() => navigate(props.navigateTo)}>
                <Icon iconName={props.iconName} />
            </button>
            <p>{props.label}</p>
        </div>
    );
}

export { MainMenuButton };
