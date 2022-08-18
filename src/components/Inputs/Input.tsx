interface PropTypes
{
    type: string;
    className?: string;
    initialValue?: string;
    maxLength?: number;
    isReadOnly?: boolean;
    isDisabled?: boolean;
    placeholder?: string;
    autoComplete?: boolean;
    InputOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input (props: PropTypes)
{
    return (
        <input
            type={props.type}
            value={props.initialValue}
            autoComplete={props.autoComplete ? 'on' : 'off'}
            maxLength={props.maxLength}
            readOnly={Boolean(props.isReadOnly)}
            disabled={Boolean(props.isDisabled)}
            onChange={props.InputOnChange}
            className={`w-full border-solid border border-[#D2D2D2] rounded placeholder:text-[#727272] 
                        placeholder:text-base disabled:bg-[#D2D2D2] disabled:text-[#727272] p-1 pl-2 
                        ${props.className ? props.className : ''}`}
            placeholder={props.placeholder}
        />
    );
}

export { Input };
