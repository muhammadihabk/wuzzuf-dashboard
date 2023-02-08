import '../css/Home.css';
import { useState, useRef, useCallback } from 'react';
import JobCardBySkill from '../components/JobCardBySkill';
import useGetJobsForHome from '../hooks/useGetJobsForHome';

export const Home = () => {
    const [ pageNum, setPageNum ] = useState(0);
    const [ filter, setFilter ] = useState('');

    const {
        jobs,
        isLoading,
        isError,
        errorMsg,
        hasNextPage
    } = useGetJobsForHome(filter, pageNum);

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
    
    const handleSearch = (e) => {
        // if input is injection clean, do the search
        if((/[^a-zA-Z\s\+#-]/).test(e.target.value)) { return; }
        cards = [];
        setPageNum(0);
        let temp = e.target.value;
        temp = temp.replaceAll('+', '%2B')
            .replaceAll('#', '%23');
        setFilter(temp);
    };
    
    return (
        <div className="Home" id='top'>
            <input className="searchbar" type="text" placeholder="skill, role or company" onChange={handleSearch}/>
            <div className="cards">{cards}</div>
            {isLoading && <p>loading...</p>}
            <a className='to-page-top' href='#top'>^</a>
        </div>
    );
}