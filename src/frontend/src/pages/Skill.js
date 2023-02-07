import '../css/Skill.css';
import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JobCardBySkill from '../components/JobCardBySkill';


export const Skill = () => {
    const [ jobs, setJobs ] = useState([]);
    let { skillName } = useParams();

    useEffect(() => {
            const fetchJobs = async() => {
                if(skillName.toLowerCase() === 'c++') {
                    skillName = 'c%2B%2B';
                }
                const response = await fetch(`http://localhost:8080/app/skill?pageNum=0&filter=${skillName}`);
                const data = await response.json();
                setJobs(data);
            };
            fetchJobs();
        },[skillName]
    );

    return (
        <div className='Skill'>
            <h1 className='page-title'>{skillName}</h1>
            <div className='cards'>{jobs.map(job => <JobCardBySkill key={job.id} job={job}/> )}</div>
        </div>
    );
}