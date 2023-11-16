import ReactLoading from 'react-loading';

export default function Loader({type, color, message}) {
  return (
    <div>
      <div style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "#2D9CDB"
      }}>
        <h2>{message}</h2>
        <h2>Don't close window!</h2>
        <ReactLoading
          type={type}
          color={color}
          height={'100%'}
          width={'100%'} />
      </div>
    </div>
  );
}
