import React, { useState, useEffect } from 'react';
import { JobCardBySkill } from '../components/JobCardBySkill';
import { getJobsData } from '../api/GetJobsForHome';

const useGetJobsForHome = (filter, pageNum = 1) => {
    const [ jobs, setJobs ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isError, setIsError ] = useState(false);
    const [ errorMsg, setErrorMsg ] = useState('');
    const [ hasNextPage, setHasNextPage ] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setIsError(false);
        setErrorMsg('');
        const controller = new AbortController();
        const { signal } = controller;

        getJobsData(filter, { signal }, pageNum)
            .then(data => {
                console.log(`API called`);
                setJobs(prevData => [...prevData, ...data]);
                setHasNextPage(Boolean(data.length));
                setIsLoading(false);
            })
            .catch(e => {
                setIsLoading(false);
                if(signal.aborted) { return; }
                setIsError(true);
                setErrorMsg(e.message);
            });
        return () => controller.abort();
    }, [pageNum])

    return {jobs, isLoading, isError, errorMsg, hasNextPage};
}

export default useGetJobsForHome;