import { InputSubMessage, ReferenceInputSubMessageType } from './InputSubMessage';
import { useRef, useState } from 'react';
import { Input } from './Input';
import { InputReferenceType } from './InputReferenceType';
import { accountNumberMask } from '../../masks/accountNumberMask';

interface PropTypes
{
    className?: string;
    value?: string;
    isDisabled?: boolean;
    reference?: React.MutableRefObject<InputReferenceType>;
}

function AccountNumberInput (props?: PropTypes)
{
    const accountNumberLength = 10;
    const [ value, setValue ] = useState(props?.value ? props.value : '');
    const inputSubMessageRef = useRef({} as ReferenceInputSubMessageType);

    function AccountNumberInputOnChange (event: React.ChangeEvent<HTMLInputElement>)
    {
        setValue(accountNumberMask(event.target.value));
    }

    function isAccountNumberValid ()
    {
        const condition = value.length === accountNumberLength;

        if (condition) inputSubMessageRef.current.setNormalSubMessage('Conta');
        else inputSubMessageRef.current.setErrorSubMessage('Conta incompleta');

        return condition;
    }

    if (props?.reference) props.reference.current = { value, isValid: isAccountNumberValid, setValue };

    return (
        <div className={`${props?.className ? props.className : ''}`}>
            <Input type="text" isDisabled={props?.isDisabled} initialValue={value} maxLength={accountNumberLength} placeholder="Conta" InputOnChange={AccountNumberInputOnChange} />
            <InputSubMessage reference={inputSubMessageRef} initialSubMessage="Conta" />
        </div>
    );
}

export { AccountNumberInput };
