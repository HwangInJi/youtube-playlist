import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FcRating, FcPlus, FcApproval, FcCancel, FcCheckmark, FcEmptyTrash } from 'react-icons/fc';
import { FaEdit } from 'react-icons/fa';
import { IoMusicalNotes } from 'react-icons/io5';
import { v4 as uuidv4 } from 'uuid'; // UUID를 생성하기 위한 라이브러리

const Header = () => {
    const [showInput, setShowInput] = useState(false); // 입력 박스 표시 여부 상태
    const [newItem, setNewItem] = useState(''); // 새 항목의 제목 상태
    const [playlists, setPlaylists] = useState([]); // 플레이리스트 상태
    const [editingIndex, setEditingIndex] = useState(null); // 수정 중인 플레이리스트 인덱스
    const [editingName, setEditingName] = useState(''); // 수정 중인 플레이리스트 이름

    useEffect(() => {
        const storedPlaylists = JSON.parse(localStorage.getItem('playlists')) || [];
        setPlaylists(storedPlaylists);
    }, []);

    const handleAddClick = () => {
        setShowInput(true); // 입력 박스 표시
    };

    const handleInputChange = (e) => {
        setNewItem(e.target.value); // 입력 값 업데이트
    };

    const handleAddItem = () => {
        if (newItem.trim() !== '') { // 제목이 비어있지 않은 경우
            const newPlaylist = {
                id: uuidv4(), // UUID로 고유한 ID 생성
                name: newItem,
                items: [] // 초기 항목 배열
            };

            const updatedPlaylists = [...playlists, newPlaylist];
            setPlaylists(updatedPlaylists); // 상태 업데이트
            localStorage.setItem('playlists', JSON.stringify(updatedPlaylists)); // 로컬 스토리지에 저장
            setNewItem(''); // 입력 값 초기화
            setShowInput(false); // 입력 박스 숨기기
        }
    };

    const handleCancelAdd = () => {
        setNewItem(''); // 입력 값 초기화
        setShowInput(false); // 입력 박스 숨기기
    };

    const handleEditClick = (id, name) => {
        setEditingIndex(id);
        setEditingName(name);
    };

    const handleEditChange = (e) => {
        setEditingName(e.target.value);
    };

    const handleSaveEdit = (id) => {
        const updatedPlaylists = playlists.map((playlist) =>
            playlist.id === id ? { ...playlist, name: editingName } : playlist
        );
        setPlaylists(updatedPlaylists);
        localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
        setEditingIndex(null);
        setEditingName('');
    };

    const handleDeleteClick = (id) => {
        const updatedPlaylists = playlists.filter((playlist) => playlist.id !== id);
        setPlaylists(updatedPlaylists);
        localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
    };

    const playlistLinks = playlists.map((playlist) => (
        <li key={playlist.id}>
            {editingIndex === playlist.id ? (
                <div>
                    <input
                        type='text'
                        value={editingName}
                        onChange={handleEditChange}
                    />
                    <button onClick={() => handleSaveEdit(playlist.id)}><FcCheckmark /></button>
                </div>
            ) : (
                <>
                    <Link to={`/playlist/${playlist.id}`}><span className='icon2'><FcApproval /></span>{playlist.name}</Link>
                    <div className="edit-buttons">
                        <button onClick={() => handleEditClick(playlist.id, playlist.name)}><FaEdit /></button>
                        <button onClick={() => handleDeleteClick(playlist.id)}><FcEmptyTrash /></button>
                    </div>
                </>
            )}
        </li>
    ));

    return (
        <header id='header' role='banner'>
            <h1 className='logo'>
                <Link to='/'><IoMusicalNotes />Music Chart</Link>
            </h1>
            <h2>chart</h2>
            <ul>
                <li><Link to='chart/melon'><span className='icon'></span>멜론 차트</Link></li>
                <li><Link to='chart/bugs'><span className='icon'></span>벅스 차트</Link></li>
                <li><Link to='chart/apple'><span className='icon'></span>애플 차트</Link></li>
                <li><Link to='chart/genie'><span className='icon'></span>지니 차트</Link></li>
                <li><Link to='chart/billboard'><span className='icon'></span>빌보드 차트</Link></li>
            </ul>
            <h2>playlist</h2>
            <ul>
                <li><Link to='/mymusic'><span className='icon2'><FcRating /></span>My music</Link></li>
                {playlistLinks}
                <li>
                    {showInput ? (
                        <div>
                            <input 
                                type='text' 
                                value={newItem}
                                onChange={handleInputChange}
                            />
                            <button onClick={handleAddItem}><FcCheckmark /></button>
                            <button onClick={handleCancelAdd}><FcCancel /></button>
                        </div>
                    ) : (
                        <Link to='#' onClick={handleAddClick}><span className='icon2'><FcPlus /></span>Create</Link>
                    )}
                </li>
            </ul>
        </header>
    );
}

export default Header;
