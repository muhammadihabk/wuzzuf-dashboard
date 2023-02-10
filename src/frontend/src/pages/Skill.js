import '../css/Skill.css';
import { useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import JobCard from '../components/JobCard';
import useGetJobs from '../hooks/useGetJobs';


export const Skill = () => {
    const { skillName } = useParams();
    const [ pageNum, setPageNum ] = useState(0);
    
    const {
        jobs,
        isLoading,
        isError,
        errorMsg,
        hasNextPage
    } = useGetJobs(skillName, pageNum);

    const observer = useRef();
    const lastCardRef = useCallback(job => {
        if(isLoading) { return; }
        if(observer.current) { observer.current.disconnect(); }
        observer.current = new IntersectionObserver(observerJobs => {
            if(observerJobs[0].isIntersecting && hasNextPage && jobs.length >= 12) {
                setPageNum(prev => prev + 1);
            }
        });
        if(job) { observer.current.observe(job); }
    }, [isLoading, hasNextPage]);

    if(isError) {
        return <p className='api-error'>Error: {errorMsg}</p>;
    }

    let cards = [];
    if(jobs.length !== 0) {
        for(let i = 0; i < jobs.length - 1; i++) {
            cards.push(<JobCard key={jobs[i].id} job={jobs[i]} setPageNum={setPageNum}
                pageKind={'skill'}/>);
        }
        cards.push(<JobCard ref={lastCardRef} key={jobs[jobs.length - 1].id} job={jobs[jobs.length - 1]}
            setPageNum={setPageNum} pageKind={'skill'}/>);
    }

    return (
        <div className='Skill'>
            <h1 className='page-title'>{skillName}</h1>
            <div className="cards">{cards}</div>
            {isLoading && <p>loading...</p>}
            <a className='to-page-top' href='#top'>^</a>
        </div>
    );
}