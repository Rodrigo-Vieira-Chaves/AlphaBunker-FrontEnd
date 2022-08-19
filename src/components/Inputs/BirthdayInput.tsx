import { InputSubMessage, ReferenceInputSubMessageType } from './InputSubMessage';
import { useRef, useState } from 'react';
import { Input } from './Input';
import { InputBox } from './InputBox';
import { InputReferenceType } from './InputReferenceType';
import { birthdayMask } from '../../masks/birthdayMask';
import { isDateValid } from '../../utils/isDateValid';

interface PropTypes
{
    className?: string;
    placeholder?: string;
    reference?: React.MutableRefObject<InputReferenceType>;
}

function BirthdayInput (props: PropTypes)
{
    const maxBirthdayLength = 10;

    const [ value, setValue ] = useState('');
    const inputSubMessageRef = useRef({} as ReferenceInputSubMessageType);

    function birthdayInputOnChange (event: React.ChangeEvent<HTMLInputElement>)
    {
        setValue(birthdayMask(event.target.value));
    }

    function isBirthdayValid ()
    {
        const condition = value.length === maxBirthdayLength && isDateValid(value);

        if (condition) inputSubMessageRef.current.setNormalSubMessage('');
        else inputSubMessageRef.current.setErrorSubMessage('Favor digitar uma data de nascimento válida');

        return condition;
    }

    if (props?.reference) props.reference.current = { value, isValid: isBirthdayValid, setValue };

    return (
        <InputBox className={`${props?.className ? props.className : ''}`}>
            <Input type="text" initialValue={value} maxLength={maxBirthdayLength}
                placeholder={props.placeholder ? props.placeholder : 'Digite sua data de nascimento'} InputOnChange={birthdayInputOnChange} />
            <InputSubMessage reference={inputSubMessageRef} />
        </InputBox>
    );
}

export { BirthdayInput };
