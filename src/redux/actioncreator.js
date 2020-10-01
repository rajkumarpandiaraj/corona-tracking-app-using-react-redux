import {SELECTED_COUNTRY_CHANGE, 
        FROM_DATE, TO_DATE,
        COUNTRY_LIST_REQUEST,
        COUNTRY_LIST_SUCCESS,
        COUNTRY_LIST_FAILURE,
        STAT_BY_COUNTRY_REQUEST,
        STAT_BY_COUNTRY_SUCCESS,
        STAT_BY_COUNTRY_FAILURE} from './actiontype';
import axios from 'axios';
    

//SelectedCountry Change Handler
    const countryHandler = (e) =>{
        return {
            type : SELECTED_COUNTRY_CHANGE,
            payload : e.target.value
        }
    }

//FromDate Change HAndler
    const fromDateHandler = (e) =>{
        return {
            type : FROM_DATE,
            payload : e.target.value
        }
    }

//ToDate Change Handler
    const toDateHandler = (e) =>{
        return {
            type : TO_DATE,
            payload : e.target.value,
        }
    }
    /*****Fetching Country List*******/

//Country List Request
    const countryListRequest = () =>{
        return {
            type : COUNTRY_LIST_REQUEST
        }
    }

    const countryListSuccess = (list, caseStat) =>{
        return{
            type : COUNTRY_LIST_SUCCESS,
            payload : {list, caseStat}
        }
    }

    const countryListFailure = err =>{
        return {
            type : COUNTRY_LIST_FAILURE,
            payload  : err,
        }
    }

    const statByCountryRequest = () =>{
        return {
            type : STAT_BY_COUNTRY_REQUEST
        }
    }

    const statByCountrySuccess = (data) =>{
        const confirmedCase = data.map(country => country.Confirmed);
        const date = data.map(country => country.Date.substring(0,10));
        return {
            type : STAT_BY_COUNTRY_SUCCESS,
            payload : {data, date, confirmedCase}
        }
    }

    const statByCountryFailure = (err) =>{
        return {
            type : STAT_BY_COUNTRY_FAILURE,
            payload : err
        }
    }



    const fetchCountryList = () =>{
        return (dispatch) =>{
                dispatch(countryListRequest)
            axios.get('https://api.covid19api.com/summary')
            .then(res => dispatch(countryListSuccess(res.data.Countries, res.data.Global)))
            .catch(err => dispatch(countryListFailure(err)))
        }
        
    }
    
    const fetchStatBYCountry = () =>{
        return (dispatch, getState) =>{
            const {fromDate, toDate, selectedCountry} = getState();
            axios
            .get(`https://api.covid19api.com/country/${selectedCountry}?from=${fromDate}T00:00:00Z&to=${toDate}T00:00:00Z`)
            .then (res => dispatch(statByCountrySuccess(res.data)))  
            .catch( err => dispatch(statByCountryFailure(err)))
        }
    }

export {
        countryHandler, 
        fromDateHandler, 
        toDateHandler,
        fetchCountryList,
        fetchStatBYCountry,
        statByCountryRequest,
    } ;