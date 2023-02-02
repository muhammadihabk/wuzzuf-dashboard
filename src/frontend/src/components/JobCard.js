import { React } from 'react';
import { Link } from 'react-router-dom';

export const JobCard = ({job}) => {
  let skills = job.skills.split(",");
  const lastSkill = skills.pop();
  return (
    <div className="JobCard">
        <div>
            <h2>{job.role}</h2>
            <h3>Skills</h3>
            <p>{skills.map(
              skill => {
                return <Link to={`/skill/${skill.trim()}`}>{skill}, </Link>;
              }
            )}
            <Link to={`/skill+${lastSkill.trim()}`}>{lastSkill}</Link>
            </p>
            <p>{job.yoe}</p>
        </div>
    </div>
  );
}