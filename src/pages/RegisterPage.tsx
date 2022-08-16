import { AlphaBankLogo } from '../components/AlphaBankLogo';
import { BirthdayInput } from '../components/Inputs/BirthdayInput';
import { Button } from '../components/Button';
import { CPFInput } from '../components/Inputs/CPFInput';
import { EmailInput } from '../components/Inputs/EmailInput';
import { NameInput } from '../components/Inputs/NameInput';
import { NavLink } from 'react-router-dom';
import { PasswordInput } from '../components/Inputs/PasswordInput';

function RegisterPage ()
{
    return (
        <div className="flex flex-col items-center bg-[#EAEDF0] p-14 pt-9 h-screen">
            <AlphaBankLogo />
            <h1 className="text-[#353535] font-medium text-xl mt-3 mb-7">Crie sua conta</h1>
            <NameInput className="mb-5 w-full" placeholder="Digite seu Nome"/>
            <BirthdayInput className="mb-5 w-full" placeholder="Digite sua data de nascimento"/>
            <CPFInput className="mb-5 w-full"/>
            <EmailInput className="mb-5 w-full" placeholder="Digite seu Email"/>
            <PasswordInput className="mb-5 w-full" />
            <PasswordInput className="mb-6 w-full" placeholder="Confirme sua Senha" />
            <Button className="mb-2" label="Cadastrar" onClick={() => console.log('OPAAA')}></Button>
            <NavLink className="text-[#353535] text-sm" to={'main/extract'}>Entrar</NavLink>
        </div>
    );
}

export { RegisterPage };
