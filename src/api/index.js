import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  // following url will change based on our country of choice.
  let changeableUrl = url;
  // when fetchData will be called passing country as an argument.
  if(country){
    changeableUrl = `${url}/countries/${country}`;
  }
  try {
    // const response = await axios.get(url);
    const response = await axios.get(changeableUrl);
    // destructuring data key and 4 sub keys the from response object.
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = response;
    // const modifiedData = {
    //   confirmed,
    //   recovered,
    //   deaths,
    //   lastUpdate,
    // };
    return {
        confirmed,
        recovered,
        deaths,
        lastUpdate,
      };
  } catch (err) {
    console.log(err);
  }
};
// following function will fetch daily data
export const fetchDailyData = async ()=>{
  try{
    const response = await axios.get(`${url}/daily`);
    // console.log(response);
    const {data} = response; // data is an array.
    const modifiedData = data.map((dailyData)=>{
      return ({
        confirmed: dailyData.confirmed,
        deaths: dailyData.deaths,
        data: dailyData.reportDate
      })
    });
    return modifiedData;
  }catch(err){
    console.log(err);
  }
}
// get the list of countries in our page to show in select option tag.
export const fetchCountries = async ()=>{
  try{
    const response = await axios.get(`${url}/countries`);
    const { data: {countries} } = response;
    return (
      countries.map((country)=>country.name)
    );
    // console.log(response);
  }catch(err){
    console.log(err);
  }
}
