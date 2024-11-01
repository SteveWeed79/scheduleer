
import React from 'react';

const ToastNotification = ({ message, onClose }) => (
    <div className="toast-container">
        <div className="toast">
            <p>{message}</p>
            <button onClick={onClose}>&times;</button>
        </div>
    </div>
);

export default ToastNotification;
