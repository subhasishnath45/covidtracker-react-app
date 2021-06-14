import React,{useState, useEffect} from 'react'

import {fetchDailyData} from '../../api';
import { Line,Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

export default function Chart({data: {confirmed,recovered,deaths},country}) {
    console.log(confirmed);
    const [dailyData, setDailyData] = useState([]);

    // useEffect() with async await.
    useEffect(async ()=>{
        const fetchAPI = async ()=>{
            // an array of objects
            setDailyData(await fetchDailyData());
        }

        fetchAPI();        
    },[]);

    const lineChart = (
        // check whether the data is available or not.
        dailyData.length 
        ? 
        (<Line
        data={{
            labels: dailyData.map(({date})=>date),
            datasets: [
                {
                    data:dailyData.map(({confirmed})=>confirmed),
                    label: 'Infected',
                    borderColor: '#3333dd',
                    fill:true
                },
                {
                    data:dailyData.map(({deaths})=>deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255,0,0,0.5)',
                    fill:true
                }
            ],
        }}
        />) : null
    );
        console.log(`Daily data: ${dailyData}`);
    const barChart = (
        confirmed
        ?
        (<Bar
        data={{
            labels:['Infected','Recovered','Deaths'],
            datasets:[{
                label: 'People',
                backgroundColor: ['rgba(0,0,255,0.5)',
                    'rgba(0,255,0,0.5)',
                    'rgba(255,0,0,0.5)'],
                data:[confirmed.value, recovered.value, deaths.value]
            }]
        }}
        options={{
            legand: {display:false},
            title: {display:true, text: `current state in ${country}`},
        }}
        />)
        :
        null
    );

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}
