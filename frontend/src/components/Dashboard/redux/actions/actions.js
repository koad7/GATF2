export const SET_PROJECT = 'SET_PROJECT';
export const setProject = data => ({
    type: SET_PROJECT,
    payload: {data},
});


export const SET_COUNTRY = 'SET_COUNTRY';
export const setCountry = data => ({
    type: SET_COUNTRY,
    payload: {data}
});

export const SET_STATUS = 'SET_STATUS';
export const setStatus = data => ({
    type: SET_STATUS,
    payload: {data}
});


export const UNSET_FILTER = 'UNSET_FILTER';
export const unsetFilter = data => ({
    type: UNSET_FILTER,
    payload: {data}
})

