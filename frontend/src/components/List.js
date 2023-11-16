import { useLocation } from 'react-router-dom';
import Topmenu from './List_components/Topmenu';
import Monitoring from './List_components/Monitoring';
import './List.css';

export default function List() {

    const location = useLocation();
    const userName = location.state.userName;
    const userEmail = location.state.userEmail;

    return (
        <div id='frame_3'>
            <Topmenu
                userName={userName}
                userEmail={userEmail}
            />
            <Monitoring
                userEmail={userEmail}
            />
        </div>
    );
}
