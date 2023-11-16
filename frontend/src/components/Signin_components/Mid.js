import { Link } from 'react-router-dom';
import Midf from './Midf';
import './Mid.css';

export default function Mid() {
    return (
        <div id='component_2'>
            <div id='site_name'>
                Bad Road Paint
                Monitoring Site
            </div>
            <Midf/>
            <Link to="/findpw" id='forgot'>
                forgot password
            </Link>
            <div id='intro'>
                <h1>About this site</h1>
                Deep learning model uses images from vehicle-mounted equipment,<p/>
                such as black boxes on regular vehicles and buses,<p/>
                to detect defective road paints across the country.<p/>
                And on this site, you can monitor<p/>
                images of bad road paints and gps information that model detects.<p/>&nbsp;<p/>
                <h1>Developer</h1>
                * Seok Jun Yun *<p/>
                * Jin Myeong Park *<p/>&nbsp;<p/>
                <h1>Researcher</h1>
                * Jong Hun Kim *<p/>
                * Yu Jun Han *
            </div>
        </div>
    );
}
