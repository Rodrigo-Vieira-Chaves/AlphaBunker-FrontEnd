import { MouseEventHandler } from 'react';

interface PropTypes
{
    label: string;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

function Button (props: PropTypes)
{
    function onClick (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)
    {
        event.preventDefault();
        if (props.onClick) props.onClick(event);
    }

    return (
        <button className={`flex justify-center items-center bg-[#338896] text-white text-lg rounded-md w-full h-10 py-2 ${props.className ? props.className : ''}`}
            onClick={onClick}>{props.label}</button>
    );
}

export { Button };
