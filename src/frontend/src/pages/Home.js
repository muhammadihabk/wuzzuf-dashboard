import React, { useEffect, useState } from 'react';
import { JobCardBySkill } from '../components/JobCardBySkill';

export const Home = () => {
    const [ jobs, setJobs ] = useState([]);
    const searchBarRef = React.createRef()

    let pageNum = 0;
    let filter = '';
    let handdleOnChange = (e) => {
        fetchJobs();
    };

    const fetchJobs = async() => {
        // if input is injection clean, do the search
        if(searchBarRef.current.value !== '' && !(/[^a-zA-Z\s\+-]/).test(searchBarRef.current.value)) {
            filter = searchBarRef.current.value;
            if(filter === 'c++') {
                filter = 'c%2B%2B';
            }
        }
        const response = await fetch(`http://localhost:8080/app/jobs?pageNum=${pageNum}&filter=${filter}`);
        let data = await response.json();
        setJobs(data);
    };
    
    useEffect(() => {           
            fetchJobs();
        },[]
    );
    
    return (
        <div className="Home">
            <h1>Wuzzuf Dashboard</h1>
            <input type="text" ref={searchBarRef} placeholder="skill, role or company" onChange={handdleOnChange}/>
            {jobs.map(job => <JobCardBySkill key={job.id} job={job}/>)}
        </div>
    );
}