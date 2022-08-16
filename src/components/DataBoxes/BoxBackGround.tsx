interface PropsType
{
    className?: string;
    children?: React.ReactNode;
}

function BoxBackGround (props?: PropsType)
{
    return (
        <div className={`bg-[#F3F9F9] text-[#A2A2A2] p-1 rounded font-medium text-sm ${props?.className ? props.className : ''}`}>
            {props?.children}
        </div>
    );
}

export { BoxBackGround };
