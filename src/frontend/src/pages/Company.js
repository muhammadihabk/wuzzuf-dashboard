import { React, useEffect, useState } from 'react';
import { JobCard } from '../components/JobCard';

export const Company = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(
        () => {
            const fetchJobs = async() => {
                const response = await fetch('http://localhost:8080/app/jobs/by_company/Cegedim');
                const data = await response.json();
                setJobs(data);
            };
            fetchJobs();
        },[]
    );

    return (
        <div className="Company">
            {jobs.map(job => <JobCard key={job.id} job={job}/> )}
        </div>
    );
}