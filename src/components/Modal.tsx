import { MouseEventHandler, useState } from 'react';
import { Button } from './Button';
import { Icon } from './Icon';

interface ModalReferenceType
{
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ModalData
{
    title: string;
    description: string;
    confirmButtonLabel: string;
    isErrorModal: boolean;
    reference?: React.MutableRefObject<ModalReferenceType>
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

function Modal (props: ModalData)
{
    const [ showModal, setShowModal ] = useState(false);

    if (props.reference) props.reference.current = { setShowModal };

    return (
        <>
            {
                showModal &&
                <div className="absolute left-0 top-0 w-screen h-screen bg-black/50">
                    <div className=
                        {
                            `flex flex-col justify-center items-center sm:w-1/4 sm:m-auto bg-white dark:bg-[#23292C] dark:border dark:border-[#424245] alpha-bunker-title text-lg rounded-t-3xl p-5
                            transform transition-all translate-y-3/4 ease-in-out duration-1000 ${props.className ? props.className : ''}`
                        }>
                        <div className="flex justify-between items-center w-full">
                            <h3 className="text-xl">{props.title}</h3>
                            <Icon iconName="X" color="black" onClick={() => setShowModal(false)} />
                        </div>
                        <p className="text-sm font-medium text-center mt-6">{props.description}</p>
                        {!props.isErrorModal && <p className="text-sm font-medium text-center">Deseja continuar?</p>}
                        <div className="flex justify-center items-center gap-5 mt-6 w-[80%]">
                            {!props.isErrorModal && <Button className="w-28 bg-[#E24B2D] font-medium text-sm" label="Cancelar" onClick={() => setShowModal(false)} />}
                            <Button className="w-28 font-medium text-sm" label={props.confirmButtonLabel} onClick={props.onClick ? props.onClick : () => setShowModal(false)} />
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export { Modal };
export type { ModalData, ModalReferenceType };
