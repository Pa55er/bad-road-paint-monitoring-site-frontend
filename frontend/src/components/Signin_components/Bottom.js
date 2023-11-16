import './Bottom.css';

export default function Bottom() {
    function handleTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <div id='component_3' onClick={handleTop}>
            TOP
        </div>
    );
}
