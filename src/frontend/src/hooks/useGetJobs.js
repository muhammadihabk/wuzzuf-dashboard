import { useState, useEffect } from 'react';
import { getJobsData } from '../api/GetJobs';

const useGetJobs = (inFilter, pageNum) => {
    const [ jobs, setJobs ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isError, setIsError ] = useState(false);
    const [ errorMsg, setErrorMsg ] = useState('');
    const [ hasNextPage, setHasNextPage ] = useState(false);
    let filter = `%25${inFilter.toLowerCase()
        .replaceAll('+', '%2B')
        .replaceAll('#', '%23')
        .replaceAll('&', '%26')}%25`;

    useEffect(() => {
        if(pageNum === 0) {
            setJobs([]);
        }
        setIsLoading(true);
        setIsError(false);
        setErrorMsg('');
        const controller = new AbortController();
        const { signal } = controller;

        getJobsData(filter, { signal }, pageNum)
            .then(data => {
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
    }, [pageNum, filter])

    return {jobs, isLoading, isError, errorMsg, hasNextPage};
}

export default useGetJobs;