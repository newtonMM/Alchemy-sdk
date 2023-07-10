import ReactDOM from "react-dom";

const ViewDetails = (props) => {
  console.log(props);

  const Modal = (props) => {
    return (
      <div className="modal">
        <div className="md-in">
          <p className="title">Transaction Details</p>
          <p>To {props.to}</p>
          <p>Status {props.status}</p>
          <p>From {props.from}</p>
          <p>Block Hash {props.blockHash}</p>
          <div onClick={props.onConfirm} className="btn">
            Exit
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {ReactDOM.createPortal(
        <Modal
          to={props.to}
          status={props.status}
          from={props.from}
          blockHash={props.blockHash}
          onConfirm={props.onConfirm}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default ViewDetails;
