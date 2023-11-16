import './Googlemap.css';

export default function Googlemap({ gps }) {

    if(gps === '') return (
        <div
            id='googlemap' >
                Click GPS value to see location on Google Maps.
        </div>
    );

    return (
        <iframe
            id='googlemap'
            title='Google Map'
            src={`https://maps.google.com/maps?q=${gps}&t=&z=14&ie=UTF8&iwloc=&output=embed`} />
    );
}
