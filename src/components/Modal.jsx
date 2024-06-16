import React, { useEffect, useState } from 'react';

const Modal = ({ isOpen, onClose, onAddToPlaylist }) => {
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState('');

    useEffect(() => {
        if (isOpen) {
            const storedPlaylists = JSON.parse(localStorage.getItem('playlists')) || [];
            setPlaylists(storedPlaylists);
        }
    }, [isOpen]);

    const handleAddClick = () => {
        if (selectedPlaylist) {
            onAddToPlaylist(selectedPlaylist);
            onClose();
        } else {
            alert('플레이리스트를 선택하세요.');
        }
    };

    const handleSelectChange = (event) => {
        setSelectedPlaylist(event.target.value);
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="modal_close" onClick={onClose}>&times;</span>
                <h2>플레이리스트 선택</h2>
                <select value={selectedPlaylist} onChange={handleSelectChange}>
                    <option value="" disabled>플레이리스트를 선택하세요</option>
                    {playlists.map((playlist) => (
                        <option key={playlist.id} value={playlist.id}>
                            {playlist.name}
                        </option>
                    ))}
                </select>
                <button onClick={handleAddClick} className="add-button">추가</button>
            </div>
        </div>
    );
};

export default Modal;
