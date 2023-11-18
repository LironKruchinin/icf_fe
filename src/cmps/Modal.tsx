import React, { FC, ReactNode, useRef } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
    const modalRef = useRef(null);

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        // Check if the click is outside the modal content
        if (event.target === modalRef.current) {
            onClose();
        }
    }

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleOverlayClick} ref={modalRef}>
            <div className="modal-content">
                <button className="modal-close-button" onClick={onClose}>
                    &times;
                </button>
                <div className='modal-children'>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
