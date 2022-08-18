interface PropsType
{
    className?: string;
    children?: React.ReactNode;
}

function AppBackground (props?: PropsType)
{
    return (
        <div className={`flex flex-col items-center bg-[#EAEDF0] dark:bg-[#23292C] h-screen ${props?.className ? props.className : ''}`}>
            {props?.children}
        </div>
    );
}

export { AppBackground };
