import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MusicPlayerContext } from '../context/MusicPlayerProvider';
import he from 'he';  // he 라이브러리 임포트

const Playlist = () => {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState({ name: '', items: [] });
    const { addTrackToList, playTrack, musicData } = useContext(MusicPlayerContext);

    useEffect(() => {
        const storedPlaylists = JSON.parse(localStorage.getItem('playlists')) || [];
        const storedPlaylist = storedPlaylists.find(playlist => playlist.id === id) || { name: '', items: [] };
        setPlaylist(storedPlaylist);
    }, [id]);

    const handlePlayTrack = (track) => {
        addTrackToList(track);
        playTrack(musicData.length);  // 새로 추가된 트랙의 인덱스를 사용하여 재생
    };

    const handleDeleteTrack = (index) => {
        const updatedPlaylist = { ...playlist };
        updatedPlaylist.items.splice(index, 1);
        setPlaylist(updatedPlaylist);
        updateLocalStorage(updatedPlaylist);
    };

    const handleMoveTrack = (index, direction) => {
        const updatedPlaylist = { ...playlist };
        const [removed] = updatedPlaylist.items.splice(index, 1);
        updatedPlaylist.items.splice(index + direction, 0, removed);
        setPlaylist(updatedPlaylist);
        updateLocalStorage(updatedPlaylist);
    };

    const updateLocalStorage = (updatedPlaylist) => {
        const storedPlaylists = JSON.parse(localStorage.getItem('playlists')) || [];
        const playlistIndex = storedPlaylists.findIndex(pl => pl.id === updatedPlaylist.id);
        storedPlaylists[playlistIndex] = updatedPlaylist;
        localStorage.setItem('playlists', JSON.stringify(storedPlaylists));
    };

    return (
        <section id="playlist">
            {playlist.items.length > 0 ? (
                <div className='music-chart'>
                    <div className="title">
                        <h2>💦 {`${playlist.name}`}</h2>
                    </div>
                    <div className="list">
                        <ul>
                            {playlist.items.map((item, index) => (
                                <li key={index}>
                                    <div onClick={() => handlePlayTrack(item)}>
                                        <span className='rank'>#{index + 1}</span> {/* 순서 표시 */}
                                        <span className='img' style={{ backgroundImage: `url(${item.imageURL})` }}></span>
                                        <span className='title'>{he.decode(item.title)}</span>
                                    </div>
                                    <div>
                                        <button onClick={() => handleDeleteTrack(index)}>삭제</button>
                                        {index > 0 && <button onClick={() => handleMoveTrack(index, -1)}>위로</button>}
                                        {index < playlist.items.length - 1 && <button onClick={() => handleMoveTrack(index, 1)}>아래로</button>}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <section className='music-chart'>
                    <div className="title">
                        <h2>💦 {`${playlist.name}`}</h2>
                    </div>
                    <div className="list">
                        <ul>
                            <li>!!아직 리스트가 없습니다. 노래를 추가해주세요!</li>
                        </ul>
                    </div>
                </section>
            )}
        </section>
    );
};

export default Playlist;
