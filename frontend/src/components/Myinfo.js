import { useLocation } from 'react-router-dom';
import Ft2 from './Myinfo_components/Ft2'
import './Myinfo.css';

export default function Myinfo() {

    const location = useLocation();
    const userName = location.state.userName;
    const userEmail = location.state.userEmail;

    return (
        <div id='frame_4'>
            <div id='mi'>
                My Information
            </div>
            <Ft2
                userName={userName}
                userEmail={userEmail}
            />
        </div>
    );
}
