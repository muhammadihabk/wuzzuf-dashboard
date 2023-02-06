import '../css/Company.css'
import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { JobCardByCompany } from '../components/JobCardByCompany';

export const Company = () => {
    const [ jobs, setJobs ] = useState([]);
    const { companyName } = useParams();
    
    useEffect(() => {
            const fetchJobs = async() => {
                const response = await fetch(`http://localhost:8080/app/company?pageNum=0&filter=${companyName}`);
                const data = await response.json();
                setJobs(data);
            };
            fetchJobs();
        },[]
    );
    
    return (
        <div className="Company">
            <h1 className='page-title'>{companyName}</h1>
            <div class="cards">{jobs.map(job => <JobCardByCompany key={job.id} job={job}/> )}</div>
        </div>
    );
}