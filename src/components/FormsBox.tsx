interface PropsType
{
    className?: string;
    children?: React.ReactNode;
}

function FormsBox (props?: PropsType)
{
    return (
        <div className={`w-full sm:w-1/2 flex flex-col items-center ${props?.className ? props.className : ''}`}>
            {props?.children}
        </div>
    );
}

export { FormsBox };
