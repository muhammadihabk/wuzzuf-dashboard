import '../css/Home.css';
import { useState, useRef, useCallback } from 'react';
import JobCard from '../components/JobCard';
import useGetJobs from '../hooks/useGetJobs';

export const Home = () => {
    const [ pageNum, setPageNum ] = useState(0);
    const [ filter, setFilter ] = useState('%25%25');

    const {
        jobs,
        isLoading,
        isError,
        errorMsg,
        hasNextPage
    } = useGetJobs(filter, pageNum);

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
    if(jobs.length != 0) {
        for(let i = 0; i < jobs.length - 1; i++) {
            cards.push(<JobCard key={jobs[i].id} job={jobs[i]} setPageNum={setPageNum}
                pageKind={'skill'}/>);
        }
        cards.push(<JobCard ref={lastCardRef} key={jobs[jobs.length - 1].id} job={jobs[jobs.length - 1]}
            setPageNum={setPageNum} pageKind={'skill'}/>);
    }
    
    const handleSearch = (e) => {
        // if input is not injection clean, don't update the filter
        if((/[^a-zA-Z\s#\+-/]/).test(e.target.value)) { return; }
        cards = [];
        setPageNum(0);
        setFilter(e.target.value);
    };

    const searchbar = document.getElementById('searchbar');
    window.onkeyup = e => {
        if(e.key === "/") {
            searchbar.focus();
        }
    };

    const handleSubmit = e => e.preventDefault();
    
    return (
        <div className="Home" id='top'>
            <form onSubmit={handleSubmit}>
                <div className="searchbar">
                    <span className='searchbar-hint'>/</span>
                    <input className="searchbar__input" id='searchbar' type="text" placeholder="skill, role or company" onChange={handleSearch}/>
                </div>
            </form>
            <div className="cards">{cards}</div>
            {isLoading && <p>loading...</p>}
            <a className='to-page-top' href='#top'>^</a>
        </div>
    );
}