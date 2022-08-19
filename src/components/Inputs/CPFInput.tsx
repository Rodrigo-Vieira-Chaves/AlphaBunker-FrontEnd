import { InputSubMessage, ReferenceInputSubMessageType } from './InputSubMessage';
import { useRef, useState } from 'react';
import { Input } from './Input';
import { InputBox } from './InputBox';
import { InputReferenceType } from './InputReferenceType';
import { cpfMask } from '../../masks/cpfMask';

interface PropTypes
{
    className?: string;
    placeholder?: string;
    reference?: React.MutableRefObject<InputReferenceType>;
}

function CPFInput (props?: PropTypes)
{
    const cpfLength = 14;
    const [ value, setValue ] = useState('');
    const inputSubMessageRef = useRef({} as ReferenceInputSubMessageType);

    function CPFInputOnChange (event: React.ChangeEvent<HTMLInputElement>)
    {
        setValue(cpfMask(event.target.value));
    }

    function isCPFValid ()
    {
        const condition = value.length === cpfLength;

        if (condition) inputSubMessageRef.current.setNormalSubMessage('');
        else inputSubMessageRef.current.setErrorSubMessage('Favor digitar CPF corretamente');

        return condition;
    }

    if (props?.reference) props.reference.current = { value, isValid: isCPFValid, setValue };

    return (
        <InputBox className={`${props?.className ? props.className : ''}`}>
            <Input type="text" initialValue={value} maxLength={cpfLength} placeholder={props?.placeholder ? props.placeholder : 'Digite seu CPF'} InputOnChange={CPFInputOnChange} />
            <InputSubMessage reference={inputSubMessageRef} />
        </InputBox>
    );
}

export { CPFInput };
