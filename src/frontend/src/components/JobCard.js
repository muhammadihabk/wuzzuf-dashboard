import { React } from 'react';

export const JobCard = ({job}) => {
  return (
    <div className="JobCard">
        <div>
            <h3>{job.role}</h3>
            <h4>Skills</h4>
            <p>{job.skills}</p>
            <p>YoE {job.yoe}</p>
        </div>
    </div>
  );
}