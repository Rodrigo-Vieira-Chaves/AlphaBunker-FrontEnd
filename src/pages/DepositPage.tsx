import { DataBox, DataBoxLabels } from '../components/DataBoxes/DataBox';
import { Modal, ModalData, ModalReferenceType } from '../components/Modal';
import { useContext, useRef, useState } from 'react';
import { AccountNumberInput } from '../components/Inputs/AccountNumberInput';
import { BranchInput } from '../components/Inputs/BranchInput';
import { Button } from '../components/Button';
import { CurrencyInput } from '../components/Inputs/CurrencyInput';
import { InputReferenceType } from '../components/Inputs/InputReferenceType';
import { UserLoggedDataContext } from '../providers/UserLoggedDataProvider';
import { makeDeposit } from '../apiCalls/makeDeposit';
import { useNavigate } from 'react-router-dom';

function DepositPage ()
{
    const navigate = useNavigate();
    const userInfo = useContext(UserLoggedDataContext);

    const modalRef = useRef({} as ModalReferenceType);
    const currencyInputRef = useRef({} as InputReferenceType);

    const [ modalData, setModalData ] = useState({} as ModalData);

    const branch = `${userInfo.userLogged.account.branch}-${userInfo.userLogged.account.branchDigit}`;
    const account = `${userInfo.userLogged.account.accountNumber}-${userInfo.userLogged.account.accountNumberDigit}`;

    async function executeDeposit ()
    {
        modalRef.current.setShowModal(false);

        const depositResponse = await makeDeposit(Number(currencyInputRef.current.value), userInfo);

        if (!depositResponse.success)
        {
            setModalData(
                {
                    title: '',
                    description: depositResponse.message,
                    confirmButtonLabel: 'Ok',
                    isErrorModal: true,
                }
            );

            modalRef.current.setShowModal(true);

            return;
        }

        currencyInputRef.current.setValue('0.00');

        userInfo.updateUserInfo();
        userInfo.setLastTransaction(depositResponse.data);

        navigate('/main/receipt');
    }

    async function verifyCurrencyValue ()
    {
        if (!currencyInputRef.current.isValid()) return;

        setModalData(
            {
                title: 'Confirmar Depósito',
                description: 'Esta ação efetuará o depósito.',
                confirmButtonLabel: 'Confirmar',
                isErrorModal: false,
                onClick: executeDeposit,
            }
        );

        modalRef.current.setShowModal(true);
    }

    return (
        <>
            <Modal reference={modalRef} title={modalData.title} isErrorModal={modalData.isErrorModal} confirmButtonLabel={modalData.confirmButtonLabel}
                description={modalData.description} onClick={modalData.onClick} />
            <DataBox className="mt-24" label={DataBoxLabels.DEPOSITO} >
                <p className="mt-2 mb-2.5">Dados para depósito</p>
                <div className="flex justify-between w-full">
                    <BranchInput className="w-28" value={branch} isDisabled={true} />
                    <AccountNumberInput className="w-28" value={account} isDisabled={true} />
                </div>
                <CurrencyInput className="mt-4" value="0.00" reference={currencyInputRef} />
                <Button className="mt-4" label="Depositar" onClick={verifyCurrencyValue}/>
            </DataBox>
        </>
    );
}

export { DepositPage };
