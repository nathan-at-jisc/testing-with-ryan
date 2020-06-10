import React, { useState } from 'react';
import axios from 'axios';

const App = () => {

    const [ steamId, setSteamId ] = useState('99211940');

    const [ data, setData ] = useState({});

    const grabDataFromAPI = async () => {

        const apiData = await axios.get(`https://api.opendota.com/api/players/${steamId}`);

        setData(apiData.data)

    }

    const renderUserData = () => {

        return(
            <div className='row'>
                <div className='col-lg-3'>
                    <img className='img-fluid' src={data.profile.avatarfull} />
                </div>
                <div className='col-lg-9'>
                    <h2>{data.profile.personaname}</h2>
                    <ul>
                        <li>MMR Estimate: {data.mmr_estimate.estimate}</li>
                        <li>Cheese: {data.profile.cheese}</li>
                        <li>Last login: {data.profile.last_login}</li>
                        <li>Solo Competitive Rank: {data.solo_competitive_rank}</li>
                        <li>Rank tier: {data.rank_tier}</li>
                    </ul>
                </div>
            </div>
        )

    }

    return(
        <div className='container'>
            <h1>Searching for Dota Players - {steamId}</h1>
            <div className="input-group my-4">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Steam ID"
                    value={steamId}
                    onChange={(event) => {
                        setSteamId(event.target.value);
                    }}
                />
                <div className="input-group-append">
                    <button 
                        className="btn btn-outline-secondary" 
                        type="button"
                        onClick={() => {
                            grabDataFromAPI()
                        }}
                    >Search</button>
                </div>
            </div>
            {data.profile && renderUserData()}
        </div>
    );
}

export default App;