import { DataBox, DataBoxLabels } from '../components/DataBoxes/DataBox';
import { Modal, ModalData, ModalReferenceType } from '../components/Modal';
import { useContext, useRef, useState } from 'react';
import { AccountNumberInput } from '../components/Inputs/AccountNumberInput';
import { BranchInput } from '../components/Inputs/BranchInput';
import { Button } from '../components/Button';
import { CPFInput } from '../components/Inputs/CPFInput';
import { CurrencyInput } from '../components/Inputs/CurrencyInput';
import { InputReferenceType } from '../components/Inputs/InputReferenceType';
import { PasswordInput } from '../components/Inputs/PasswordInput';
import { UserLoggedDataContext } from '../providers/UserLoggedDataProvider';
import { makeTransfer } from '../apiCalls/makeTransfer';
import { useNavigate } from 'react-router-dom';

function TransferPage ()
{
    const navigate = useNavigate();
    const userInfo = useContext(UserLoggedDataContext);

    const modalRef = useRef({} as ModalReferenceType);
    const currencyInputRef = useRef({} as InputReferenceType);
    const passwordInputRef = useRef({} as InputReferenceType);
    const branchInputRef = useRef({} as InputReferenceType);
    const accountNumberInputRef = useRef({} as InputReferenceType);
    const cpfInputRef = useRef({} as InputReferenceType);

    const [ modalData, setModalData ] = useState({} as ModalData);

    const branch = `${userInfo.userLogged.account.branch}-${userInfo.userLogged.account.branchDigit}`;
    const account = `${userInfo.userLogged.account.accountNumber}-${userInfo.userLogged.account.accountNumberDigit}`;

    async function executeTransfer ()
    {
        modalRef.current.setShowModal(false);

        const branchInfo = branchInputRef.current.value.split('-');
        const accountInfo = accountNumberInputRef.current.value.split('-');

        const destinationAccount =
        {
            clientCPF: cpfInputRef.current.value,
            account:
            {
                branch: Number(branchInfo[0]),
                branchDigit: Number(branchInfo[1]),
                accountNumber: Number(accountInfo[0]),
                accountNumberDigit: Number(accountInfo[1])
            }
        };

        const transferResponse = await makeTransfer(Number(currencyInputRef.current.value), userInfo, destinationAccount, passwordInputRef.current.value);

        if (!transferResponse.success)
        {
            setModalData(
                {
                    title: '',
                    description: transferResponse.message,
                    confirmButtonLabel: 'Ok',
                    isErrorModal: true,
                }
            );

            modalRef.current.setShowModal(true);

            return;
        }

        currencyInputRef.current.setValue('0.00');
        passwordInputRef.current.setValue('');
        branchInputRef.current.setValue('');
        accountNumberInputRef.current.setValue('');
        cpfInputRef.current.setValue('');

        userInfo.updateUserInfo();

        transferResponse.data.destination = transferResponse.echo.destination;
        userInfo.setLastTransaction(transferResponse.data);

        navigate('/main/receipt');
    }

    async function verifyInputValues ()
    {
        const currencyValid = currencyInputRef.current.isValid();
        const passwordValid = passwordInputRef.current.isValid();
        const branchValid = branchInputRef.current.isValid();
        const accountNumberValid = accountNumberInputRef.current.isValid();
        const cpfValid = cpfInputRef.current.isValid();

        if (!(currencyValid && passwordValid && branchValid && accountNumberValid && cpfValid)) return;

        setModalData(
            {
                title: 'Confirmar Transferência',
                description: 'Esta ação efetuará a transferência.',
                confirmButtonLabel: 'Confirmar',
                isErrorModal: false,
                onClick: executeTransfer,
            }
        );

        modalRef.current.setShowModal(true);
    }

    return (
        <>
            <Modal reference={modalRef} title={modalData.title} isErrorModal={modalData.isErrorModal} confirmButtonLabel={modalData.confirmButtonLabel}
                description={modalData.description} onClick={modalData.onClick} />
            <DataBox className="mt-10 overflow-y-scroll" label={DataBoxLabels.TRANSFERÊNCIA} >
                <p className="alpha-bunker-title mt-1 mb-2.5 text-sm">Origem</p>
                <div className="flex justify-between w-full">
                    <BranchInput className="w-28" value={branch} isDisabled={true} />
                    <AccountNumberInput className="w-28" value={account} isDisabled={true} />
                </div>
                <p className="alpha-bunker-title mt-1 mb-2.5 text-sm">Destino</p>
                <CPFInput placeholder="Digite CPF Destino" reference={cpfInputRef} />
                <div className="flex justify-between w-full mt-1">
                    <BranchInput className="w-28" isDisabled={false} reference={branchInputRef} />
                    <AccountNumberInput className="w-28" isDisabled={false} reference={accountNumberInputRef} />
                </div>
                <CurrencyInput className="mt-4" value="0.00" reference={currencyInputRef} />
                <PasswordInput className="mt-2" reference={passwordInputRef} />
                <Button className="mt-4" label="Transferir" onClick={verifyInputValues}/>
            </DataBox>
        </>
    );
}

export { TransferPage };
