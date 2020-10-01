import React,{useEffect} from 'react';
import {
        countryHandler,
        toDateHandler,
        fromDateHandler,
        fetchCountryList,
        statByCountryRequest,
        fetchStatBYCountry
        } from '../redux/actioncreator';
import Card from './Card';
import { connect } from 'react-redux';
import Linechart from './Linechart'

function Covidtracker(props) {
    const {countries,
            selectedCountry,
            countryHandler,
            fromDate,
            toDate,
            toDateHandler,
            fromDateHandler,
            selectedCountryObj,
            totalConfirmed,
            totalRecovered,
            totalDeath,
            fetchCountryList,
            fetchStatBYCountry,
            selectedCountryDate,
            selectedCountryConfirmedCase } = props;

        useEffect(() => {
            fetchCountryList();
        }, [selectedCountryObj,fetchCountryList])
    return (
        <div>
            
            <h1>
            {
                Object.keys(selectedCountryObj).length === 0?
                "World Wide Corona Report" :
                `${selectedCountry}'s Corona Report`
            }
            </h1>
                <div className='cards'>
                    <Card title='Total Confirmed' count={
                                Object.keys(selectedCountryObj).length === 0?
                                            totalConfirmed :
                                            selectedCountryObj.TotalConfirmed}/>
                    <Card title='Total Recovered' count={
                                Object.keys(selectedCountryObj).length === 0?
                                            totalRecovered :
                                            selectedCountryObj.TotalRecovered}/>
                    <Card title='Total Death' count={
                                Object.keys(selectedCountryObj).length === 0?
                                            totalDeath :
                                            selectedCountryObj.TotalDeaths} />
                </div>
                <form>
                    <select value={selectedCountry} onChange={countryHandler}>
                        <option value=''>Select country</option>
                        {
                            countries.map((country, index) => <option key={index} value={country.slug}>{country.Country}</option>)
                        }
                    </select>
                    <div className='form-flex'>
                        <div className='form-grp'>
                            <label htmlFor='from-date'>From</label>
                            <input type='date' id='from-date' value={fromDate} onChange={fromDateHandler} placeholder='Select From Date'/>
                        </div>
                        <div className='form-grp'>
                            <label htmlFor='to-date'>TO</label>
                            <input type='date' id='to-date' value={toDate} onChange={toDateHandler}/>
                        </div>
                    </div>
                    <button type='submit' className='btn' onClick={(e) =>{e.preventDefault(); return fetchStatBYCountry()}}>Check</button>
                </form>
                {
                    Object.keys(selectedCountryObj).length !== 0 && <Linechart label={selectedCountryDate} selectedCountryData={selectedCountryConfirmedCase}/>
                }
        </div>
    )
}
const mapStateToProps = (state) =>{
    return {
        countries : state.countries,
        selectedCountry : state.selectedCountry,
        fromDate : state.fromDate,
        toDate : state.toDate,
        selectedCountryObj : state.selectedCountryObj,
        totalConfirmed : state.totalConfirmed,
        totalRecovered : state.totalRecovered,
        totalDeath : state.totalDeath,
        selectedCountryDate : state.selectedCountryDate,
        selectedCountryConfirmedCase : state.selectedCountryConfirmedCase
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        countryHandler : (e) => dispatch(countryHandler(e)),
        fromDateHandler : (e) => dispatch(fromDateHandler(e)),
        toDateHandler : (e) => dispatch(toDateHandler(e)),
        fetchCountryList : () => dispatch(fetchCountryList()),
        statByCountryRequest : () => dispatch(statByCountryRequest()),
        fetchStatBYCountry : () => {dispatch(fetchStatBYCountry())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Covidtracker);
