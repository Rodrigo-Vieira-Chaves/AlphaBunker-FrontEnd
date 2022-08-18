import { Modal, ModalData, ModalReferenceType } from '../components/Modal';
import { useRef, useState } from 'react';
import { AlphaBankLogo } from '../components/AlphaBankLogo';
import { AppBackground } from '../components/AppBackground';
import { BirthdayInput } from '../components/Inputs/BirthdayInput';
import { Button } from '../components/Button';
import { CPFInput } from '../components/Inputs/CPFInput';
import { EmailInput } from '../components/Inputs/EmailInput';
import { InputReferenceType } from '../components/Inputs/InputReferenceType';
import { NameInput } from '../components/Inputs/NameInput';
import { NavLink } from 'react-router-dom';
import { PasswordInput } from '../components/Inputs/PasswordInput';
import { createAccount } from '../apiCalls/createAccount';

function RegisterPage ()
{
    const modalRef = useRef({} as ModalReferenceType);
    const nameInputRef = useRef({} as InputReferenceType);
    const birthdayInputRef = useRef({} as InputReferenceType);
    const cpfInputRef = useRef({} as InputReferenceType);
    const emailInputRef = useRef({} as InputReferenceType);
    const passwordInputRef = useRef({} as InputReferenceType);
    const passwordConfirmationInputRef = useRef({} as InputReferenceType);

    const [ modalData, setModalData ] = useState({} as ModalData);

    async function executeRegistration ()
    {
        const nameValid = nameInputRef.current.isValid();
        const birthdayValid = birthdayInputRef.current.isValid();
        const cpfValid = cpfInputRef.current.isValid();
        const emailValid = emailInputRef.current.isValid();
        const passwordValid = passwordInputRef.current.isValid();
        const passwordConfirmationValid = passwordConfirmationInputRef.current.isValid();

        if (!(nameValid && birthdayValid && cpfValid && emailValid && passwordValid && passwordConfirmationValid)) return;

        if (!(passwordInputRef.current.value === passwordConfirmationInputRef.current.value))
        {
            passwordConfirmationInputRef.current.inputSubMessageRef?.current.setErrorSubMessage('As senhas devem ser iguais');

            return;
        }

        const result = await createAccount(
            nameInputRef.current.value,
            birthdayInputRef.current.value.replaceAll('/', '-'),
            emailInputRef.current.value,
            cpfInputRef.current.value,
            passwordInputRef.current.value
        );

        if (result.success)
        {
            setModalData(
                {
                    title: '',
                    description: 'Uma nova conta foi criada para esse cliente!',
                    confirmButtonLabel: 'Ok',
                    isErrorModal: true,
                }
            );
        }
        else
        {
            setModalData(
                {
                    title: '',
                    description: result.message,
                    confirmButtonLabel: 'Ok',
                    isErrorModal: true,
                }
            );
        }

        modalRef.current.setShowModal(true);
    }

    return (
        <AppBackground className="p-14 pt-9 overflow-y-auto">
            <Modal reference={modalRef} title={modalData.title} isErrorModal={modalData.isErrorModal} confirmButtonLabel={modalData.confirmButtonLabel}
                description={modalData.description} onClick={modalData.onClick} />
            <AlphaBankLogo />
            <h1 className="alpha-bunker-title font-medium text-xl mt-3 mb-7">Crie sua conta</h1>
            <NameInput className="mb-5 w-full" reference={nameInputRef} />
            <BirthdayInput className="mb-5 w-full" reference={birthdayInputRef} />
            <CPFInput className="mb-5 w-full" reference={cpfInputRef} />
            <EmailInput className="mb-5 w-full" reference={emailInputRef} />
            <PasswordInput className="mb-5 w-full" reference={passwordInputRef} />
            <PasswordInput className="mb-6 w-full" placeholder="Confirme sua Senha" reference={passwordConfirmationInputRef} />
            <Button className="mb-2" label="Cadastrar" onClick={executeRegistration}></Button>
            <NavLink className="alpha-bunker-link text-sm" to={'/'}>Entrar</NavLink>
        </AppBackground>
    );
}

export { RegisterPage };
