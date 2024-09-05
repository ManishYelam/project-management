import React, { useEffect, useState } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./Dashboard.css";
import logo from "../../assets/Logo.svg";
import Sidebar from "../../components/Sidebar/Sidebar";

const Dashboard = () => {
  const [counters, setCounters] = useState({
    totalProjects: 0,
    totalClosed: 0,
    totalRunning: 0,
    closureDelay: 0,
    totalCancelled: 0,
  });
  const [chartData, setChartData] = useState({ categories: [], registered: [], closed: [] });
  const [loadingCounters, setLoadingCounters] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getDashboardData = async () => {
      await fetchCounters();
      await fetchClosureDelay();
      await fetchChartData();
      setLoadingCounters(false);
    };

    getDashboardData();
  }, []);

  const fetchCounters = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/dashboard/counters");
      const data = response.data;
      setCounters(prevState => ({
        ...prevState,
        totalProjects: data.totalProjects,
        totalClosed: data.closedProjects,
        totalRunning: data.runningProjects,
        totalCancelled: data.cancelledProjects,
      }));
    } catch (error) {
      console.error("Error fetching counters:", error);
      setError("Failed to load counters.");
    }
  };

  const fetchClosureDelay = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/dashboard/closure-delay");
      const data = response.data;
      setCounters(prevState => ({
        ...prevState,
        closureDelay: data.closureDelayProjects,
      }));
    } catch (error) {
      console.error("Error fetching closure delay:", error);
      setError("Failed to load closure delay.");
    }
  };

  const fetchChartData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/dashboard/chart-data");
      console.log('API Response:', response.data); // Check what the response looks like
  
      // Extract data from response
      const { categories, registered, closed } = response.data;
  
      // Ensure that closed values are numbers
      const formattedClosed = closed.map(value => parseInt(value, 10));
  
      // Update chart data state
      setChartData({
        categories,
        registered,
        closed: formattedClosed
      });
  
    } catch (err) {
      console.error("Error fetching chart data:", err.message);
      setError("Failed to load chart data.");
    } finally {
      setLoadingChart(false);
    }
  };
  
  

  const chartOptions = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Department wise - Total Vs Closed'
    },
    xAxis: {
      categories: chartData.categories,
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Number of Projects'
      }
    },
    tooltip: {
      shared: true,
      formatter: function() {
        const points = this.points || [];
        return points.map(point => `<b>${point.series.name}</b>: ${point.y}`).join('<br/>');
      }
    },
    series: [
      {
        name: 'Registered',
        data: chartData.registered
      },
      {
        name: 'Closed',
        data: chartData.closed
      }
    ]
  };
  

  return (
    <>
      <Sidebar />
      <div className="dashboard">
        <header className="dashboard-header">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <div className="counters">
            {loadingCounters ? (
              <p>Loading counters...</p>
            ) : (
              <>
                <div className="counter-card">
                  <h3>Total Projects</h3>
                  <p>{counters.totalProjects}</p>
                </div>
                <div className="counter-card">
                  <h3>Closed Projects</h3>
                  <p>{counters.totalClosed}</p>
                </div>
                <div className="counter-card">
                  <h3>Running Projects</h3>
                  <p>{counters.totalRunning}</p>
                </div>
                <div className="counter-card">
                  <h3>Closure Delay</h3>
                  <p>{counters.closureDelay}</p>
                </div>
                <div className="counter-card">
                  <h3>Cancelled Projects</h3>
                  <p>{counters.totalCancelled}</p>
                </div>
              </>
            )}
          </div>
        </header>
        <div className="chart-container">
          {loadingChart ? (
            <p>Loading chart...</p>
          ) : (
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          )}
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
