import { DataBox, DataBoxLabels } from '../components/DataBoxes/DataBox';
import { Modal, ModalData, ModalReferenceType } from '../components/Modal';
import { useContext, useRef, useState } from 'react';
import { AccountNumberInput } from '../components/Inputs/AccountNumberInput';
import { BranchInput } from '../components/Inputs/BranchInput';
import { Button } from '../components/Button';
import { CurrencyInput } from '../components/Inputs/CurrencyInput';
import { FormsBox } from '../components/FormsBox';
import { InputReferenceType } from '../components/Inputs/InputReferenceType';
import { PasswordInput } from '../components/Inputs/PasswordInput';
import { UserDataContext } from '../providers/UserDataProvider';
import { makeWithdraw } from '../apiCalls/makeWithdraw';
import { useNavigate } from 'react-router-dom';

function WithdrawPage ()
{
    const navigate = useNavigate();
    const userInfo = useContext(UserDataContext);

    const modalRef = useRef({} as ModalReferenceType);
    const currencyInputRef = useRef({} as InputReferenceType);
    const passwordInputRef = useRef({} as InputReferenceType);

    const [ modalData, setModalData ] = useState({} as ModalData);

    const branch = `${userInfo.userLogged.account.branch}-${userInfo.userLogged.account.branchDigit}`;
    const account = `${userInfo.userLogged.account.accountNumber}-${userInfo.userLogged.account.accountNumberDigit}`;

    async function executeWithdraw ()
    {
        modalRef.current.setShowModal(false);

        const withdrawResponse = await makeWithdraw(Number(currencyInputRef.current.value), userInfo, passwordInputRef.current.value);

        if (!withdrawResponse.success)
        {
            setModalData(
                {
                    title: '',
                    description: withdrawResponse.message,
                    confirmButtonLabel: 'Ok',
                    isErrorModal: true,
                }
            );

            modalRef.current.setShowModal(true);

            return;
        }

        currencyInputRef.current.setValue('0.00');
        passwordInputRef.current.setValue('');

        userInfo.updateUserLogged();
        userInfo.setLastTransaction(withdrawResponse.data);

        navigate('/main/receipt');
    }

    async function verifyCurrencyAndPasswordValue ()
    {
        const currencyValid = currencyInputRef.current.isValid();
        const passwordValid = passwordInputRef.current.isValid();

        if (!(currencyValid && passwordValid)) return;

        setModalData(
            {
                title: 'Confirmar Saque',
                description: 'Esta ação efetuará o saque.',
                confirmButtonLabel: 'Confirmar',
                isErrorModal: false,
                onClick: executeWithdraw,
            }
        );

        modalRef.current.setShowModal(true);
    }

    return (
        <>
            <Modal reference={modalRef} title={modalData.title} isErrorModal={modalData.isErrorModal} confirmButtonLabel={modalData.confirmButtonLabel}
                description={modalData.description} onClick={modalData.onClick} />
            <DataBox className="mt-24" label={DataBoxLabels.SAQUE} >
                <FormsBox>
                    <p className="alpha-bunker-title mt-2 mb-2.5">Dados para saque</p>
                    <div className="flex justify-between w-full">
                        <BranchInput className="w-28" value={branch} isDisabled={true} />
                        <AccountNumberInput className="w-28" value={account} isDisabled={true} />
                    </div>
                    <CurrencyInput className="mt-4" value="0.00" reference={currencyInputRef} />
                    <PasswordInput className="mt-5" reference={passwordInputRef} />
                    <Button className="mt-4" label="Sacar" onClick={verifyCurrencyAndPasswordValue}/>
                </FormsBox>
            </DataBox>
        </>
    );
}

export { WithdrawPage };
