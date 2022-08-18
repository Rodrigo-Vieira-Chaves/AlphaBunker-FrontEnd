import { InputSubMessage, ReferenceInputSubMessageType } from './InputSubMessage';
import { useRef, useState } from 'react';
import { Input } from './Input';
import { InputReferenceType } from './InputReferenceType';

interface PropTypes
{
    className?: string;
    placeholder?: string;
    reference?: React.MutableRefObject<InputReferenceType>;
}

function EmailInput (props: PropTypes)
{
    const [ value, setValue ] = useState('');
    const inputSubMessageRef = useRef({} as ReferenceInputSubMessageType);

    function emailInputOnChange (event: React.ChangeEvent<HTMLInputElement>)
    {
        setValue(event.target.value);
    }

    function isEmailValid ()
    {
        const condition = (/^(\S+)@((?:(?:(?!-)[a-zA-Z0-9-]{1,62}[a-zA-Z0-9])\.)+[a-zA-Z0-9]{2,12})$/).test(value);

        if (condition) inputSubMessageRef.current.setNormalSubMessage('');
        else inputSubMessageRef.current.setErrorSubMessage('Formato do email deve ser: \'email@provedor.extensao\'');

        return condition;
    }

    if (props?.reference) props.reference.current = { value, isValid: isEmailValid, setValue };

    return (
        <div className={`${props?.className ? props.className : ''}`}>
            <Input type="text" initialValue={value} maxLength={50} placeholder={props.placeholder ? props.placeholder : 'Digite seu Email'} InputOnChange={emailInputOnChange} />
            <InputSubMessage reference={inputSubMessageRef} />
        </div>
    );
}

export { EmailInput };
