import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Tooltip, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
const CITIES = [
    "Makkah",
    "Madinah",
    "Riyadh",
    "Jeddah",
    "Tayif",
    "Dammam",
    "Abha",
    "Jizan",
];
const WeatherMap = () => {
    // Weather data state
    const [weatherData, setWeatherData] = useState([]);

    // Saudi Arabia's coordinates
    const position = [23.8859, 45.0792]; 
    
    useEffect(() => {
        // Connect to the server using socket.io client
        const socket = io('http://localhost:8000/weather/live', {
            transports: ['websocket'],
        });
        socket.on('connect', () => {
            console.log('Connected to server with id', socket.id);
            // Emit the live event to the server with the cities list to get the weather data
            socket.emit('live', CITIES);
            socket.on('weatherData', (data) => {
                console.log(data);
                // Set the weather data to the state
                setWeatherData(data);
            });
        });

        // Error handling
        socket.on('connect_error', (error) => {
            console.log('Connection Error', error);
        });
        socket.on('error', (error) => {
            console.log('Error', error);
        });

        // Disconnect from the server when the component is unmounted
        return () => {
            socket.disconnect();
        };
    }, []);

    // I used the react-leaflet library to render the map and the weather data on the map
    // Render the weather map with the weather data on the map as circle markers with tooltips
    return (
        <div className='p-4 bg-gray-800  h-screen flex flex-col'>
            <div className='flex flex-col items-center justify-center text-4xl m-2 mb-8 text-orange-700'>
                <h1>
                Live Radar Weather Map
                </h1>
                <div className='flex justify-center'>
                <Link to={"/"} className="px-4 py-2 text-lg bg-green-600 text-white rounded mt-6 hover:bg-green-700">
                    Exit
                </Link>
                </div>
            </div>
            <div className='border-2 border-black'>
                <MapContainer center={position} zoom={6} style={{ height: "80vh", width: "100%" }}>
                    <TileLayer
                        url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" />
                    {weatherData.map((data) => (
                        <CircleMarker
                            key={data.name}
                            center={[data.coordinates.lat, data.coordinates.lon]}
                            radius={15}
                            color="red"
                        >
                            <Tooltip permanent direction='top'>
                                <div className='flex flex-col space-y-2'>
                                    <h1 className='border-b-2 border-b-green-700 text-lg font-bold'>
                                        {data.name}
                                    </h1>
                                    <h2 className='text-[1rem] font-semibold'>
                                        {data.temperatureC}°C
                                    </h2>
                                </div>
                            </Tooltip>
                        </CircleMarker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default WeatherMap;