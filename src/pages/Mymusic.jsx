import React, { useState, useContext, useEffect } from 'react';
import useFetchData from '../hook/useFetchData';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Chart from '../components/Chart';
import { MusicPlayerContext } from '../context/MusicPlayerProvider';

const Mymusic = () => {
    const [selectedFile, setSelectedFile] = useState('./data/music_list.json');
    const { data, loading, error } = useFetchData(selectedFile);
    const { loadInitialData } = useContext(MusicPlayerContext);

    const jsonFiles = [
        { name: 'music_list.json', path: './data/music_list.json' },
        { name: 'byunghyun.json', path: './data/byunghyun.json' },
        { name: 'daewon.json', path: './data/daewon.json' },
        { name: 'hyeji.json', path: './data/hyeji.json' },
        { name: 'kimjw.json', path: './data/kimjw.json' },
        { name: 'parkjungmin.json', path: './data/parkjungmin.json' },
        { name: 'seongmin.json', path: './data/seongmin.json' },
        { name: 'seonhwa.json', path: './data/seonhwa.json' },
        { name: 'seoyeon.json', path: './data/seoyeon.json' },
        { name: 'sohyun.json', path: './data/sohyun.json' },
        { name: 'yihyun.json', path: './data/yihyun.json' },
        { name: 'yoonseo.json', path: './data/yoonseo.json' },
    ];

    useEffect(() => {
        if (data && data.length > 0) {
            loadInitialData(data);
        }
    }, [data, loadInitialData]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.value);
    };

    if (loading) return <Loading loading={loading} />;
    if (error) return <Error message={error.message} />;

    return (
        <section id='myMusic'>
            <div className="music-chart">
                <div className="title01">
                    <h2 className='my__title1'>➕ Play List : </h2>
                    <select onChange={handleFileChange} value={selectedFile}>
                        {jsonFiles.map((file) => (
                            <option key={file.name} value={file.path}>
                                {file.name}
                            </option>
                        ))}
                    </select>
                </div>
                <Chart className='my__title2' title="💗 My Play List" data={data} showCalendar={false} />
            </div>
        </section>
    );
}

export default Mymusic;
