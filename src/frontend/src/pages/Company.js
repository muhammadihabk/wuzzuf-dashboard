import '../css/Company.css'
import { useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import JobCardByCompany from '../components/JobCardByCompany';
import useGetJobs from '../hooks/useGetJobs';


export const Company = () => {
    const { companyNameParam } = useParams();
    const [ pageNum, setPageNum ] = useState(0);

    let companyName = companyNameParam;
    companyName = companyName.replaceAll('&', '%26');
    
    const {
        jobs,
        isLoading,
        isError,
        errorMsg,
        hasNextPage
    } = useGetJobs(companyName, pageNum);

    const observer = useRef();
    const lastCardRef = useCallback(job => {
        if(isLoading) { return; }
        if(observer.current) { observer.current.disconnect(); }
        observer.current = new IntersectionObserver(observerJobs => {
            if(observerJobs[0].isIntersecting && hasNextPage) {
                setPageNum(prev => prev + 1);
            }
        });
        if(job) { observer.current.observe(job); }
    }, [isLoading, hasNextPage]);

    if(isError) {
        return <p className='api-error'>Error: {errorMsg}</p>;
    }

    let cards = [];
    if(jobs.length != 0) {
        for(let i = 0; i < jobs.length - 1; i++) {
            cards.push(<JobCardByCompany key={jobs[i].id} job={jobs[i]}/>);
        }
        cards.push(<JobCardByCompany ref={lastCardRef} key={jobs[jobs.length - 1].id} job={jobs[jobs.length - 1]}/>);
    }
    
    return (
        <div className='Company'>
            <h1 className='page-title'>{companyNameParam}</h1>
            <div className="cards">{cards}</div>
            {isLoading && <p>loading...</p>}
            <a className='to-page-top' href='#top'>^</a>
        </div>
    );
}