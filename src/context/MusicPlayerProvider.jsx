import React, { createContext, useState, useEffect } from 'react';

export const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
    const [musicData, setMusicData] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [played, setPlayed] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isShuffling, setIsShuffling] = useState(false);
    const [isRepeating, setIsRepeating] = useState(false);

    useEffect(() => {
        const storedMusicData = JSON.parse(localStorage.getItem('musicData')) || [];
        if (storedMusicData.length > 0) {
            setMusicData(storedMusicData);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('musicData', JSON.stringify(musicData));
    }, [musicData]);

    const loadInitialData = (data) => {
        setMusicData(data);
    };

    const addTrackToList = (track) => {
        const newTrack = { ...track, rank: 1 };
        setMusicData((prevData) => {
            return prevData.map((item, index) => ({ ...item, rank: index + 2 })).concat(newTrack);
        });
    };

    const addTrackToEnd = (track) => {
        setMusicData((prevData) => {
            const newTrack = { ...track, rank: prevData.length + 1 };
            return [...prevData, newTrack];
        });
    };

    const playTrack = (index) => {
        setCurrentTrackIndex(index);
        setIsPlaying(true);
    };

    const pauseTrack = () => {
        setIsPlaying(false);
    };

    const nextTrack = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % musicData.length);
    };

    const prevTrack = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + musicData.length) % musicData.length);
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
                musicData,
                currentTrackIndex,
                isPlaying,
                played,
                duration,
                loadInitialData,
                addTrackToList,
                addTrackToEnd,
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

export default MusicPlayerProvider