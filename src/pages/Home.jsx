import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import useFetchData from '../hook/useFetchData';
import Loading from '../components/Loading';
import Error from '../components/Error';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../assets/scss/_home.scss';

const charts = ['melon', 'genie', 'billboard', 'bugs', 'apple'];

const Home = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const formattedDate = yesterday.toISOString().split('T')[0];

  const chartUrls = charts.map(
    (chart) => `https://raw.githubusercontent.com/webs9919/music-best/main/${chart}/${chart}100_${formattedDate}.json`
  );

  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllCharts = async () => {
      try {
        const data = await Promise.all(chartUrls.map((url) => fetch(url).then((res) => res.json())));
        const chartData = {};
        charts.forEach((chart, index) => {
          chartData[chart] = data[index].slice(0, 10);
        });
        setChartData(chartData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCharts();
  }, []);

  if (loading) return <Loading loading={loading} />;
  if (error) return <Error message={error.message} />;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
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

  return (
    <div className="chart-container">
      <h1>차트별 오늘의 <em>Top 10</em></h1>
      <Slider {...settings} className="charts">
        {charts.map((chart) => (
          <div key={chart} className="chart-slide">
            <div className="chart">
              <h2>{chart.toUpperCase()} 차트</h2>
              <table>
                <thead>
                  <tr>
                    <th>순위</th>
                    <th>곡명</th>
                    <th>가수명</th>
                  </tr>
                </thead>
                <tbody>
                  {chartData[chart]?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td>{item.artist}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Home;
