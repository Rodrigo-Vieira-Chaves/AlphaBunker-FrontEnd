import { DataBox, DataBoxLabels } from '../components/DataBoxes/DataBox';
import { Icon } from '../components/Icon';
import { ReceiptDataBox } from '../components/DataBoxes/ReceiptDataBox';
import { UserLoggedDataContext } from '../providers/UserLoggedDataProvider';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function ReceiptPage ()
{
    const navigate = useNavigate();
    const userInfo = useContext(UserLoggedDataContext);

    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full sm:w-1/2 mt-16">
            <div className="w-4/5 sm:w-full">
                <Icon iconName="ArrowLeft" color="black" onClick={() => navigate('/main/extract')} />
            </div>
            <DataBox className="sm:w-full" label={DataBoxLabels.COMPROVANTE_DE_TRANSAÇAO} labelMarginBottom="mb-6">
                <ReceiptDataBox type={userInfo.lastTransaction.type} ammount={userInfo.lastTransaction.ammount}
                    createdAt={userInfo.lastTransaction.createdAt} destinyAccount={userInfo.lastTransaction.destination} />
            </DataBox>
        </div>
    );
}

export { ReceiptPage };
