import React, { createContext, useState, useEffect } from 'react';

export const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
    const [playlist, setPlaylist] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [played, setPlayed] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isShuffling, setIsShuffling] = useState(false);
    const [isRepeating, setIsRepeating] = useState(false);

    useEffect(() => {
        const storedPlaylist = JSON.parse(localStorage.getItem('playlist')) || [];
        if (storedPlaylist.length > 0) {
            setPlaylist(storedPlaylist);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('playlist', JSON.stringify(playlist));
    }, [playlist]);

    const loadInitialData = (data) => {
        setPlaylist(data);
    };

    const addTrackToEnd = (track) => {
        setPlaylist((prevData) => {
            const newTrack = { ...track, rank: prevData.length + 1 };
            return [...prevData, newTrack];
        });
    };

    const removeTrackFromList = (track) => {
        setPlaylist((prevData) => prevData.filter(item => item.title !== track.title || item.artist !== track.artist));
    };

    const playTrack = (index) => {
        setCurrentTrackIndex(index);
        setIsPlaying(true);
    };

    const pauseTrack = () => {
        setIsPlaying(false);
    };

    const nextTrack = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    };

    const prevTrack = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
    };

    const updatePlayed = (played) => {
        setPlayed(played);
    };

    const updateDuration = (duration) => {
        setDuration(duration);
    };

    const toggleShuffle = () => {
        setIsShuffling((prev) => !prev);
    };

    const toggleRepeat = () => {
        setIsRepeating((prev) => !prev);
    };

    const handleTrackEnd = () => {
        if (isRepeating) {
            playTrack(currentTrackIndex);
        } else {
            nextTrack();
        }
    };

    return (
        <MusicPlayerContext.Provider
            value={{
                playlist,
                currentTrackIndex,
                isPlaying,
                played,
                duration,
                loadInitialData,
                addTrackToEnd,
                removeTrackFromList,
                playTrack,
                pauseTrack,
                nextTrack,
                prevTrack,
                updatePlayed,
                updateDuration,
                toggleShuffle,
                isShuffling,
                toggleRepeat,
                isRepeating,
                handleTrackEnd,
            }}
        >
            {children}
        </MusicPlayerContext.Provider>
    );
};

export default MusicPlayerProvider;
