// components/Modal.js

import React from 'react';
import Modal from 'react-modal';

const CustomModal = ({ isOpen, onRequestClose, content }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Object Details"
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                },
                content: {
                    maxWidth: '80%',
                    maxHeight: '80%',
                    margin: 'auto',
                    border: 'none',
                    padding: '20px',
                    display: 'flex',
                    color: 'black'
                },
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ flex: '0 0 50%', paddingRight: '20px' }}>
                    <img src={content.primaryImageSmall} alt="Object" style={{ width: '100%', height: 'auto' }} />
                </div>
                <div style={{ flex: '0 0 50%' }}>
                    <h2>{content.title}</h2>
                    <h3>{content.objectName}</h3>
                    <p>{content.objectDate}</p>
                    <p><strong>Culture:</strong> {content.culture}</p>
                    <p><strong>Period:</strong> {content.period}</p>
                    <p><strong>Repository:</strong> {content.repository}</p>
                    <p><strong>Link:</strong> <a href={content.objectURL} target="_blank" rel="noopener noreferrer">More Details</a></p>
                </div>
            </div>
        </Modal>
    );
};

export default CustomModal;