import { React } from 'react';
import { Link } from 'react-router-dom';

export const JobCardBySkill = ({job}) => {
  let skills = job.skills.split(",");
  const lastSkill = skills.pop();
  
  return (
    <div className="JobCardBySkill">
        <div>
            <h2>{job.role} - <Link to={`/company/${job.company}`}>{job.company}</Link></h2>
            <h3>Skills</h3>
            <p>{skills.map(
              skill => {
                return <Link to={`/skill/${skill.trim()}`}>{skill.trim()}, </Link>;
              }
            )}
            <Link to={`/skill/${lastSkill.trim()}`}>{lastSkill.trim()}</Link>
            </p>
            <p>{job.yoe}</p>
        </div>
    </div>
  );
}