import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { MdFormatListBulletedAdd, MdOutlinePlayCircleFilled, MdHive } from 'react-icons/md';
import { MusicPlayerContext } from '../context/MusicPlayerProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VideoPopup from '../components/VideoPopup';
import Modal from '../components/Modal';

const Searchlist = () => {
    const [results, setResults] = useState([]);
    const location = useLocation();
    const searchTerm = new URLSearchParams(location.search).get("q");
    const { addTrackToList, addTrackToEnd, playTrack, playlist } = useContext(MusicPlayerContext);
    const [isVideoPopupOpen, setIsVideoPopupOpen] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTrack, setSelectedTrack] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            const API_KEY = "AIzaSyCg_Tv46yrtzuYFe7Z_5r6Jkr1ARzmBB6M"; // YouTube API 키를 여기에 입력하세요
            const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
                params: {
                    part: "snippet",
                    maxResults: 100,
                    q: searchTerm,
                    key: API_KEY
                }
            });
            setResults(response.data.items);
        };

        if (searchTerm) {
            fetchResults();
        }
    }, [searchTerm]);

    const handlePlayNow = (result) => {
        setVideoUrl(`https://www.youtube.com/watch?v=${result.id.videoId}`);
        setIsVideoPopupOpen(true);
    };

    const handleAddToList = (result) => {
        if (!playlist) {
            toast.error('음악 데이터를 로드할 수 없습니다.');
            return;
        }
        const newTrack = {
            title: result.snippet.title,
            videoID: result.id.videoId,
            imageURL: result.snippet.thumbnails.default.url,
            artist: result.snippet.channelTitle,
            rank: playlist.length + 1
        };
        addTrackToEnd(newTrack);
        toast.success('리스트에 추가했습니다.');
    };

    const handleAddToPlaylistClick = (result) => {
        setSelectedTrack({
            title: result.snippet.title,
            videoID: result.id.videoId,
            imageURL: result.snippet.thumbnails.default.url,
            artist: result.snippet.channelTitle,
            rank: 1
        });
        setIsModalOpen(true);
    };

    const handleAddToPlaylist = (playlistId) => {
        const storedPlaylists = JSON.parse(localStorage.getItem('playlists')) || [];
        const playlistIndex = storedPlaylists.findIndex(playlist => playlist.id === playlistId);
        if (playlistIndex !== -1 && selectedTrack) {
            selectedTrack.rank = storedPlaylists[playlistIndex].items.length + 1;
            storedPlaylists[playlistIndex].items.push(selectedTrack);
            localStorage.setItem('playlists', JSON.stringify(storedPlaylists));
            toast.success('플레이리스트에 추가했습니다.');
        }
    };

    return (
        <div id="searchlist">
            <div className="list">
                <ul>
                    {results.map((item, index) => (
                        <li key={item.id.videoId}>
                            <div>
                                <div className="rank">#{index + 1}</div>
                                <div className="img" style={{ backgroundImage: `url(${item.snippet.thumbnails.default.url})` }}></div>
                                <div className="title">{item.snippet.title}</div>
                            </div>
                            <div className="action-icons">
                                <span onClick={() => handlePlayNow(item)}>
                                    <MdOutlinePlayCircleFilled /><span className='ir'>노래듣기</span>
                                </span>
                                <span onClick={() => handleAddToList(item)}>
                                    <MdFormatListBulletedAdd /><span className='ir'>리스트 추가하기</span>
                                </span>
                                <span onClick={() => handleAddToPlaylistClick(item)}>
                                    <MdHive /><span className='ir'>나의 리스트에 추가하기</span>
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <ToastContainer />
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddToPlaylist={handleAddToPlaylist}
            />
            <VideoPopup
                isOpen={isVideoPopupOpen}
                videoUrl={videoUrl}
                onClose={() => setIsVideoPopupOpen(false)}
            />
        </div>
    );
};

export default Searchlist;
