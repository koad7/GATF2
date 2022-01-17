import {
    FILTER_COUNTRY,
    UNFILTER_PROJECT 
} from '../actions/actions';

export const isFiltered = (state = [], action) => {
    const  {type, payload} = action;
    switch(type){
        case FILTER_COUNTRY:{
            const { data } = payload;
            return state.data.filter(l =>Object.entries(state.filterObj).every(([k, v]) => !v.length || l[k] === v));
        }
        case UNFILTER_PROJECT:
            return false;
        default:
            return state;
    }
}

