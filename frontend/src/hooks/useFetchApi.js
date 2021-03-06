import { useState, useEffect } from 'react';


const API_URL = "/api/"
export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};

export default function useFetchApi() {
  const [projectData, setProjectData] = useState(null);
  const [mapData, setMapData] = useState(null);
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getProjectData() {
      fetch(API_URL, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setRequestStatus(REQUEST_STATUS.SUCCESS);
          setProjectData({'data':data.data['data']});
          setMapData(data.data['mapdata']);
        })
        .catch((error) => {
          setRequestStatus(REQUEST_STATUS.FAILURE);
          setError(error);
        });
    }
    getProjectData();
  }, []);

  return {
    projectData,
    mapData,
    requestStatus,
    error
  }
};