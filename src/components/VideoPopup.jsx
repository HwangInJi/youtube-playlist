import React from 'react';
import ReactPlayer from 'react-player';
import { MdClose } from 'react-icons/md';

const VideoPopup = ({ isOpen, videoUrl, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="video-popup">
            <div className="video-popup-content">
                <span className="video-popup-close" onClick={onClose}><MdClose /></span>
                <ReactPlayer url={videoUrl} controls playing width="57rem" height="34rem" />
            </div>
        </div>
    );
};

export default VideoPopup;
