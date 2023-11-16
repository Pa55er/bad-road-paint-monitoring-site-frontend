import { useState } from 'react';
import Googlemap from './Googlemap';
import RenderingRec from './RenderingRec';
import './Monitoring.css';

export default function Monitoring({ userEmail }) {

    const [gps, setGPS] = useState('');

    const handleGPSChange = (newData) => {
        setGPS(newData);
    };

    return (
        <div id='monitoring_rectangle'>
            <Googlemap
                gps={gps}
            />
            <RenderingRec
                userEmail={userEmail}
                handleGPSChange={handleGPSChange}
            />
        </div>
    );
}
