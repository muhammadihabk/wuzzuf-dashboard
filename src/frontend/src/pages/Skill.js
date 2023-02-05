import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { JobCardBySkill } from '../components/JobCardBySkill';


export const Skill = () => {
    const [ jobs, setJobs ] = useState([]);
    const { skillName } = useParams();

    useEffect(() => {
            const fetchJobs = async() => {
                const response = await fetch(`http://localhost:8080/app/skill?pageNum=0&filter=${skillName}`);
                const data = await response.json();
                setJobs(data);
            };
            fetchJobs();
        },[skillName]
    );

    return (
        <div className="Skill">
            <h1>{skillName}</h1>
            {jobs.map(job => <JobCardBySkill key={job.id} job={job}/> )}
        </div>
    );
}