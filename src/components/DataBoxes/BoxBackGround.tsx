interface PropsType
{
    className?: string;
    children?: React.ReactNode;
}

function BoxBackGround (props?: PropsType)
{
    return (
        <div className={`bg-[#F3F9F9] dark:bg-[#23292C] dark:border dark:border-[#424245]/50 alpha-bunker-data-text p-1 rounded font-medium text-sm ${props?.className ? props.className : ''}`}>
            {props?.children}
        </div>
    );
}

export { BoxBackGround };
