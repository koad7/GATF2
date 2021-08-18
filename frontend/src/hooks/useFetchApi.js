import { useState, useEffect } from 'react';


const API_URL="https://dsa-gatf.herokuapp.com/api/"
export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};

export default function useFetchApi() {
  const [projectData, setProjectData] = useState(null);
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
          setProjectData(data);
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
    requestStatus,
    error
  }
};