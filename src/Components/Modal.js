import '../css/Modal.css';

function Modal(props) {

  const hideModal = (event) => {
    const modal = document.querySelector('.modal');
    modal.style.display = "none";
  }

  return(
    <div className="modal">
      <div className="window">
        <h3>Instructions</h3>
        <p>Click on the most number of cards without clicking on the same card twice.</p>
        <button onClick={hideModal}>Continue</button>
      </div>
    </div>
  );
}

export default Modal;