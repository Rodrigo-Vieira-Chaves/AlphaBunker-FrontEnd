import { Modal, ModalData, ModalReferenceType } from '../components/Modal';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import { AlphaBankLogo } from '../components/AlphaBankLogo';
import { AppBackground } from '../components/AppBackground';
import { Button } from '../components/Button';
import { CPFInput } from '../components/Inputs/CPFInput';
import { InputReferenceType } from '../components/Inputs/InputReferenceType';
import { PasswordInput } from '../components/Inputs/PasswordInput';
import { UserLoggedDataContext } from '../providers/UserLoggedDataProvider';
import { authenticateUser } from '../apiCalls/authenticateUser';

function LoginPage ()
{
    const navigate = useNavigate();

    const userInfo = useContext(UserLoggedDataContext);

    const modalRef = useRef({} as ModalReferenceType);
    const cpfInputRef = useRef({} as InputReferenceType);
    const passwordInputRef = useRef({} as InputReferenceType);

    const [ modalData, setModalData ] = useState({} as ModalData);

    async function executeLogin ()
    {
        const cpfValid = cpfInputRef.current.isValid();
        const passwordValid = passwordInputRef.current.isValid();

        if (!(cpfValid && passwordValid)) return;

        const result = await authenticateUser(cpfInputRef.current.value as string, passwordInputRef.current.value as string);

        if (!result.success)
        {
            setModalData(
                {
                    title: '',
                    description: result.message,
                    confirmButtonLabel: 'Ok',
                    isErrorModal: true,
                }
            );

            modalRef.current.setShowModal(true);

            return;
        }

        result.data.account.password = passwordInputRef.current.value;
        userInfo.setUserLogged(result.data);

        navigate('/main/extract');
    }

    return (
        <AppBackground className="relative p-14 pt-24">
            <Modal reference={modalRef} title={modalData.title} isErrorModal={modalData.isErrorModal} confirmButtonLabel={modalData.confirmButtonLabel}
                description={modalData.description} onClick={modalData.onClick} />
            <AlphaBankLogo />
            <h1 className="alpha-bunker-title font-medium text-xl mt-14 mb-6">Login</h1>
            <CPFInput className="mb-5" reference={cpfInputRef} />
            <PasswordInput className="mb-6" reference={passwordInputRef} />
            <Button className="mb-2" label="Entrar" onClick={executeLogin} />
            <NavLink className="alpha-bunker-link text-sm" to={'/register'}>Crie sua conta</NavLink>
        </AppBackground>
    );
}

export { LoginPage };
