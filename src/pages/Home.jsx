import React, { useState, useEffect, useContext } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../assets/scss/_home.scss';
import { MusicPlayerContext } from '../context/MusicPlayerProvider';
import he from 'he';  // he 라이브러리 임포트

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

const Home = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { playlist, addTrackToEnd, removeTrackFromList } = useContext(MusicPlayerContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await Promise.all(
          jsonFiles.map(file =>
            fetch(file.path)
              .then(response => response.json())
              .then(jsonData => ({ [file.name]: jsonData.slice(0, 10) }))
          )
        );
        const dataObject = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
        setData(dataObject);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const isTrackInPlaylist = (track) => {
    return playlist && playlist.some(item => item.title === track.title && item.artist === track.artist);
  };

  const toggleTrackInPlaylist = (track) => {
    if (isTrackInPlaylist(track)) {
      removeTrackFromList(track);
    } else {
      addTrackToEnd(track);
    }
  };

  return (
    <div className="chart-container">
      <h1>남플리 <em>Top 10</em></h1>
      <Slider {...settings} className="charts">
        {Object.keys(data).map((fileName) => (
          <div key={fileName} className="chart-slide">
            <div className="chart">
              <h2>{fileName.replace('.json', '').toUpperCase()}</h2>
              <ul>
                {data[fileName].map((item, index) => (
                  <li key={index}>
                    <div
                      className={`star ${isTrackInPlaylist(item) ? 'filled' : ''}`}
                      onClick={() => toggleTrackInPlaylist(item)}
                    ></div>
                    <div className="details">
                      <span>{index + 1}. {he.decode(item.title)} - {he.decode(item.artist)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Home;
