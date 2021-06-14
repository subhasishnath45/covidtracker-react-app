import React, { Component } from 'react'

// import Cards from './components/Cards/Cards';
// import Chart from './components/Chart/Chart';
// import CountryPicker from './components/CountryPicker/CountryPicker';

import {Cards,Chart,CountryPicker} from './components';
// css file import as modules.
import styles from './App.module.css';
import {fetchData, fetchDailyData} from './api';

import coronalogo from './images/Covid-19-app-logo-transparent.png'

class App extends Component {
    // state object of class componetn
    state = {
        data: {}, // initially data is an empty object.
        country: ''
    }
    // componentDidMount() is invoked immediately after a component is mounted 
    // (inserted into the DOM tree).
    // made the componentDidMount async to use await inside.
    async componentDidMount(){
        const fetchedData = await fetchData(); // fetching and storing data.
        // console.log(fetchedData);
        // assigning the fetched data to the data key of our state object.
        this.setState({data: fetchedData}); // to schedule updates to the component local state

        // fetching daily data.
        const fetchedDailyData = await fetchDailyData();
        if(!fetchedDailyData){
            console.log('loading daily data');
        }
        console.log(fetchedDailyData);

    }

    // method to chage the state property country.
    handleCountryChange = async (country)=>{
        console.log(country);
        // fetching data for a country
        const fetchedData = await fetchData(country);
        // console.log(fetchedData);
        
        // set to the state variable.
        this.setState({
            data: fetchedData,
            country: country
        });
    }

    render() {
        const {data, country} = this.state;
        return (
            <div className={styles.container}>
                <img className={styles.logoimg} src={coronalogo} alt='logo'/>
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
            </div>
        )
    }
}
export default App;
