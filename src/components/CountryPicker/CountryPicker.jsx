import React,{useState, useEffect} from 'react';
import { NativeSelect,  FormControl } from '@material-ui/core';
import {fetchCountries} from '../../api';

import styles from './CountryPicker.module.css';

export default function CountryPicker({handleCountryChange}) {
    // state variable for countries.
    const [fetchedCountries, setFetchedCountries] = useState([]);
    useEffect(()=>{
        const fetchCountryAPI = async ()=>{
            // assigning as our state variable value.
            setFetchedCountries(await fetchCountries());
        }
        fetchCountryAPI();
    },[setFetchedCountries]);

    console.log(fetchedCountries);

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e)=>{handleCountryChange(e.target.value)}}>
                <option value="">Global</option>
                {
                    fetchedCountries.map((country,index)=>{
                        return (<option key={index} value={country}>{country}</option>);
                    })
                }
            </NativeSelect>
        </FormControl>
    )
}
