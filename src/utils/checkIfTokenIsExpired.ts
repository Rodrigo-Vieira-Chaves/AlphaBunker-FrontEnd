import { UserDataProps, UserInfo } from '../providers/UserDataProvider';
import { useNavigate } from 'react-router-dom';

function checkIfTokenIsExpired (responseMessage: string[] | undefined, userInfo: UserDataProps)
{
    if ((responseMessage ? responseMessage[0] : '') === 'Token expirado')
    {
        userInfo.setUserLogged({} as UserInfo);
        useNavigate()('/');
    }
}

export { checkIfTokenIsExpired };
