import '../css/Modal.css';

function Modal(props) {

  const hideModal = (event) => {
    let target = event.target;
    if (target.classList.contains("modal") || target.id === "modal-btn") {
      const modal = document.querySelector(".modal");
      modal.style.display = "none";
    }
  }

  return(
    <div onClick={hideModal} className="modal">
      <div className="window">
        <h3>Instructions</h3>
        <p>Click on the most number of cards without clicking on the same card twice.</p>
        <button id="modal-btn" onClick={hideModal}>Continue</button>
      </div>
    </div>
  );
}

export default Modal;