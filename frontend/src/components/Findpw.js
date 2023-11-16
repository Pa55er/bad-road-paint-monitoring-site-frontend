import Findpwinput from './Findpw_components/Findpwinput'
import './Findpw.css';

export default function Findpw() {
    return (
        <div id='Frame_5'>
            <div id='forgot_title'>
                Forgot&nbsp;&nbsp;Password?
            </div>
            <div id='forgot_explain'>
                Type the email address associated with your account,
                then we'll send you new passsword.
            </div>
            <Findpwinput/>
        </div>
    );
}
