import { InputSubMessage, ReferenceInputSubMessageType } from './InputSubMessage';
import { useRef, useState } from 'react';
import { Input } from './Input';
import { InputBox } from './InputBox';
import { InputReferenceType } from './InputReferenceType';
import { branchMask } from '../../masks/branchMask';

interface PropTypes
{
    className?: string;
    value?: string;
    isDisabled?: boolean;
    reference?: React.MutableRefObject<InputReferenceType>;
}

function BranchInput (props?: PropTypes)
{
    const branchLength = 6;
    const [ value, setValue ] = useState(props?.value ? props.value : '');
    const inputSubMessageRef = useRef({} as ReferenceInputSubMessageType);

    function BranchInputOnChange (event: React.ChangeEvent<HTMLInputElement>)
    {
        setValue(branchMask(event.target.value));
    }

    function isBranchValid ()
    {
        const condition = value.length === branchLength;

        if (condition) inputSubMessageRef.current.setNormalSubMessage('Agência');
        else inputSubMessageRef.current.setErrorSubMessage('Agência incompleta');

        return condition;
    }

    if (props?.reference) props.reference.current = { value, isValid: isBranchValid, setValue };

    return (
        <InputBox className={`${props?.className ? props.className : ''}`}>
            <Input type="text" isDisabled={props?.isDisabled} initialValue={value} maxLength={branchLength} placeholder="Agência" InputOnChange={BranchInputOnChange} />
            <InputSubMessage reference={inputSubMessageRef} initialSubMessage="Agência" />
        </InputBox>
    );
}

export { BranchInput };
