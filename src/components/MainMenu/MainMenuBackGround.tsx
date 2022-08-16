interface PropsType
{
    className?: string;
    children?: React.ReactNode;
}

function MainMenuBackGround (props?: PropsType)
{

    return (
        <div className={`flex flex-col justify-start items-center pt-6 bg-[#337782] rounded-b-3xl w-full h-1/3 
                         first-letter:text-center text-white text-xs ${props?.className ? props.className : ''}`}>
            {props?.children}
        </div>
    );
}

export { MainMenuBackGround };
