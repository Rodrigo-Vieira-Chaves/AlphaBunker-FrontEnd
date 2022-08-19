import { InputSubMessage, ReferenceInputSubMessageType } from './InputSubMessage';
import { useRef, useState } from 'react';
import { Input } from './Input';
import { InputBox } from './InputBox';
import { InputReferenceType } from './InputReferenceType';
import { nameMask } from '../../masks/nameMask';

interface PropTypes
{
    className?: string;
    placeholder?: string;
    reference?: React.MutableRefObject<InputReferenceType>;
}

function NameInput (props: PropTypes)
{
    const [ value, setValue ] = useState('');
    const inputSubMessageRef = useRef({} as ReferenceInputSubMessageType);

    function nameInputOnChange (event: React.ChangeEvent<HTMLInputElement>)
    {
        setValue(nameMask(event.target.value));
    }

    function isNameValid ()
    {
        const condition = (/^[A-ZÀ-Ÿ][A-zÀ-ÿ']+\s([A-zÀ-ÿ']\s?)*[A-ZÀ-Ÿ][A-zÀ-ÿ']+$/).test(value);

        if (condition) inputSubMessageRef.current.setNormalSubMessage('');
        else inputSubMessageRef.current.setErrorSubMessage('Nome do usuário deve possuir nome e sobrenome e não pode ter números ou caracteres especiais');

        return condition;
    }

    if (props?.reference) props.reference.current = { value, isValid: isNameValid, setValue };

    return (
        <InputBox className={`${props?.className ? props.className : ''}`}>
            <Input type="text" initialValue={value} maxLength={50} placeholder={props.placeholder ? props.placeholder : 'Digite seu Nome'} InputOnChange={nameInputOnChange} />
            <InputSubMessage reference={inputSubMessageRef} />
        </InputBox>
    );
}

export { NameInput };
