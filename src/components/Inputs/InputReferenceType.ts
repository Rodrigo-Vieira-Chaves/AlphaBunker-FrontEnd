interface InputReferenceType
{
    value: string;
    isValid: () => boolean;
    setValue: (value: React.SetStateAction<string>) => void;
}

export type { InputReferenceType };
