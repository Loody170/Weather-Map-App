import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-800">
            <div className="bg-gray-600 p-8 rounded-lg shadow-xl mb-96">
                <h1 className="text-4xl text-center font-bold mb-4 text-orange-700">Welcome to the live radar weather map</h1>
                <p className="text-lg text-center text-white mb-4">See weather temperatures of Saudi Arabia cities live on the map </p>
                <div className='flex justify-center'>
                <Link to={"/live-radar"} className="px-4 py-2 bg-green-600 text-white rounded mt-4 hover:bg-green-700">
                    Go to Live Radar
                </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;