import './Modal.scss';

function Modal({ closeModal, displayType, ...props }) {

    return (
        <div 
        className="modal"
        onClick={()=>closeModal()}
        id={displayType}
        >
            <div>
                { props.children }
            </div>
        </div>
    )
}
export default Modal;