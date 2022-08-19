import { InputSubMessage, ReferenceInputSubMessageType } from './InputSubMessage';
import { useRef, useState } from 'react';
import { Input } from './Input';
import { InputBox } from './InputBox';
import { InputReferenceType } from './InputReferenceType';
import { currencyMask } from '../../masks/currencyMask';

interface PropTypes
{
    className?: string;
    value?: string;
    isDisabled?: boolean;
    reference?: React.MutableRefObject<InputReferenceType>;
}

function CurrencyInput (props?: PropTypes)
{
    const currencyLength = 15;
    const minimumValue = 10;

    const [ value, setValue ] = useState(props?.value ? props.value : '');
    const inputSubMessageRef = useRef({} as ReferenceInputSubMessageType);

    function CurrencyInputOnChange (event: React.ChangeEvent<HTMLInputElement>)
    {
        setValue(currencyMask(event.target.value));
    }

    function isCurrencyValid ()
    {
        const condition = Number(value) >= minimumValue;

        if (condition) inputSubMessageRef.current.setNormalSubMessage('');
        else inputSubMessageRef.current.setErrorSubMessage(`O valor deve ser no mínimo ${minimumValue} reais`);

        return condition;
    }

    if (props?.reference) props.reference.current = { value, isValid: isCurrencyValid, setValue };

    return (
        <InputBox className={`${props?.className ? props.className : ''}`}>
            <Input type="text" isDisabled={props?.isDisabled} initialValue={value} maxLength={currencyLength} placeholder="Valor" InputOnChange={CurrencyInputOnChange} />
            <InputSubMessage reference={inputSubMessageRef}/>
        </InputBox>
    );
}

export { CurrencyInput };
