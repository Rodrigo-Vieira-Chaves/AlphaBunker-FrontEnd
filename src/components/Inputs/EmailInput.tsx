import { InputSubMessage, ReferenceInputSubMessageType } from './InputSubMessage';
import { useRef, useState } from 'react';
import { Input } from './Input';
import { InputReferenceType } from './InputReferenceType';
import { passwordMask } from '../../masks/passwordMask';

interface PropTypes
{
    className?: string;
    placeholder?: string;
    reference?: React.MutableRefObject<InputReferenceType>;
}

function EmailInput (props: PropTypes)
{
    const minPasswordLength = 4;
    const maxPasswordLength = 8;

    const [ value, setValue ] = useState('');
    const inputSubMessageRef = useRef({} as ReferenceInputSubMessageType);

    function emailInputOnChange (event: React.ChangeEvent<HTMLInputElement>)
    {
        setValue(passwordMask(event.target.value));
    }

    function isEmailValid ()
    {
        const condition = value.length >= minPasswordLength && value.length <= maxPasswordLength;

        if (condition) inputSubMessageRef.current.setNormalSubMessage('');
        else inputSubMessageRef.current.setErrorSubMessage(`Favor digitar uma senha de ${minPasswordLength} a ${maxPasswordLength} dígitos`);

        return condition;
    }

    if (props?.reference) props.reference.current = { value, isValid: isEmailValid, setValue };

    return (
        <div className={`${props?.className ? props.className : ''}`}>
            <Input type="password" initialValue={value} maxLength={maxPasswordLength} placeholder={props.placeholder ? props.placeholder : 'Digite sua Senha'} InputOnChange={emailInputOnChange} />
            <InputSubMessage reference={inputSubMessageRef} />
        </div>
    );
}

export { EmailInput };
