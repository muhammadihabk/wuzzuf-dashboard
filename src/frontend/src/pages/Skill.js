import '../css/Skill.css';
import { useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import JobCardBySkill from '../components/JobCardBySkill';
import useGetJobsForHome from '../hooks/useGetJobsForHome';


export const Skill = () => {
    const { skillName } = useParams();
    const [ pageNum, setPageNum ] = useState(0);

    const {
        jobs,
        isLoading,
        isError,
        errorMsg,
        hasNextPage
    } = useGetJobsForHome(skillName, pageNum);

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
            cards.push(<JobCardBySkill key={jobs[i].id} job={jobs[i]}/>);
        }
        cards.push(<JobCardBySkill ref={lastCardRef} key={jobs[jobs.length - 1].id} job={jobs[jobs.length - 1]}/>);
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