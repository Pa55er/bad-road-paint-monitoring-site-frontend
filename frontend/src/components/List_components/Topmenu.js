import { useNavigate } from "react-router-dom";
import Username from './Username';
import './Topmenu.css';

export default function Topmenu({ userName, userEmail }) {

    const navigate = useNavigate();

    function handleMypageButton() {
        navigate("/myinfo", {
            state: {
                userName: userName,
                userEmail: userEmail
            },
            replace: true
        });
    }

    function handleSignoutButton() {
        navigate("/signin", {
            replace: true
        });
    }

    return (
        <div id='menu_rectangle'>
            <Username
                userName={userName}
            />
            <button id='mypage_button' onClick={handleMypageButton}>
                Mypage
            </button>
            <button id='signout_button' onClick={handleSignoutButton}>
                Sign out
            </button>
        </div>
    );
}
