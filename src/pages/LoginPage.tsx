import { Modal, ModalData, ModalReferenceType } from '../components/Modal';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import { AlphaBankLogo } from '../components/AlphaBankLogo';
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
        <div className="relative flex flex-col items-center bg-[#EAEDF0] p-14 pt-24 h-screen">
            <Modal reference={modalRef} title={modalData.title} isErrorModal={modalData.isErrorModal} confirmButtonLabel={modalData.confirmButtonLabel}
                description={modalData.description} onClick={modalData.onClick} />
            <AlphaBankLogo />
            <h1 className="text-[#0a0a0a] font-medium text-xl mt-14 mb-6">Login</h1>
            <CPFInput className="mb-5 w-full" reference={cpfInputRef} />
            <PasswordInput className="mb-6 w-full" reference={passwordInputRef} />
            <Button className="mb-2" label="Entrar" onClick={executeLogin} />
            <NavLink className="text-[#353535] text-sm" to={'/register'}>Crie sua conta</NavLink>
        </div>
    );
}

export { LoginPage };
