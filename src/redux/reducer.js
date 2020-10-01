import {SELECTED_COUNTRY_CHANGE,
        FROM_DATE,
        TO_DATE,
        COUNTRY_LIST_REQUEST, 
        COUNTRY_LIST_SUCCESS,
        COUNTRY_LIST_FAILURE,
        STAT_BY_COUNTRY_REQUEST,
        STAT_BY_COUNTRY_SUCCESS,
        STAT_BY_COUNTRY_FAILURE, } from './actiontype';



const initialState = {
    countries : [{slug : 'sk', Country : 'sk'}],
    selectedCountry : '',
    fromDate : '2020-03-01',
    toDate : '2020-04-03',
    selectedCountryObj : {},
    totalConfirmed : 0,
    totalRecovered : 0,
    totalDeath : 0,
    err : '',
    loading : false,
    selectedCountryData : [], 
    selectedCountryConfirmedCase : [],
    selectedCountryDate : [],

}

const reducer = (state = initialState, action) =>{
    const {type, payload} = action;

    //SelectedCountry Value Change
    if(type === SELECTED_COUNTRY_CHANGE){
        return {...state, selectedCountry : payload}
    }

//fromDate value change
    if(type === FROM_DATE){
        return {...state, fromDate : payload}
    }

//fromDate value change
    if(type === TO_DATE){
        return {...state, toDate : payload}
    }

//Country lis Request
    if(type === COUNTRY_LIST_REQUEST){
        return {...state, loading : true}
    }

    if(type === COUNTRY_LIST_SUCCESS){
        return{...state,
                countries : payload.list,
                totalConfirmed : payload.caseStat.TotalConfirmed,
                totalRecovered : payload.caseStat.TotalRecovered,
                totalDeath : payload.caseStat.TotalDeaths
            }
    }

    if(type === COUNTRY_LIST_FAILURE){
        return {...state, err : payload}
    }

    if(type === STAT_BY_COUNTRY_REQUEST){
        return {...state}
    }

    if(type === STAT_BY_COUNTRY_SUCCESS){
        const selectedCountryObj = state.countries.filter(country => country.Country === state.selectedCountry)
        return {...state, 
            selectedCountryData : payload.data,
            selectedCountryDate : payload.date,
            selectedCountryConfirmedCase : payload.confirmedCase,
            selectedCountryObj : selectedCountryObj[0]
        }
    }

    if(type === STAT_BY_COUNTRY_FAILURE){
        return {...state, err : payload}
    }

    return state
}



export default reducer;







