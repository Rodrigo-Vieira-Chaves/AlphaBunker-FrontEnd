import { InputSubMessage, ReferenceInputSubMessageType } from './InputSubMessage';
import { useRef, useState } from 'react';
import { Input } from './Input';
import { InputBox } from './InputBox';
import { InputReferenceType } from './InputReferenceType';
import { birthdayMask } from '../../masks/passwordMask';

interface PropTypes
{
    className?: string;
    placeholder?: string;
    reference?: React.MutableRefObject<InputReferenceType>;
}

function PasswordInput (props: PropTypes)
{
    const minPasswordLength = 4;
    const maxPasswordLength = 8;

    const [ value, setValue ] = useState('');
    const inputSubMessageRef = useRef({} as ReferenceInputSubMessageType);

    function passwordInputOnChange (event: React.ChangeEvent<HTMLInputElement>)
    {
        setValue(birthdayMask(event.target.value));
    }

    function isPasswordValid ()
    {
        const condition = value.length >= minPasswordLength && value.length <= maxPasswordLength;

        if (condition) inputSubMessageRef.current.setNormalSubMessage('');
        else inputSubMessageRef.current.setErrorSubMessage(`Favor digitar uma senha de ${minPasswordLength} a ${maxPasswordLength} dígitos`);

        return condition;
    }

    if (props?.reference) props.reference.current = { value, isValid: isPasswordValid, setValue, inputSubMessageRef };

    return (
        <InputBox className={`${props?.className ? props.className : ''}`}>
            <Input type="password" initialValue={value} maxLength={maxPasswordLength} placeholder={props.placeholder ? props.placeholder : 'Digite sua Senha'} InputOnChange={passwordInputOnChange} />
            <InputSubMessage reference={inputSubMessageRef} />
        </InputBox>
    );
}

export { PasswordInput };
