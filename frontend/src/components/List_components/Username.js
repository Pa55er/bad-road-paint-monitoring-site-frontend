import './Username.css';

export default function Username({ userName }) {
    return (
        <div id='user_rectangle'>
            <div id='menu_label'>
                USER :
            </div>
            <div id='menu_username'>
                {userName}
            </div>
        </div>
    );
}
