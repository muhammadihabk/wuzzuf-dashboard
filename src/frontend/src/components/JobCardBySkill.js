import '../css/JobCard.css';
import React from 'react';
import { Link } from 'react-router-dom';

const JobCardBySkill = React.forwardRef(({job}, ref) => {
  let skills = job.skills.split(",");
  const lastSkill = skills.pop();

  const cardBody = (
    <>
      <h2>{job.role}</h2>
      <h2><Link to={`/company/${job.company}`}>{job.company}</Link></h2>
      <h3>Skills</h3>
      <p>
        {skills.map(skill => {
          return <><Link to={`/skill/${skill.trim()}`}>{skill.trim()}</Link>, </>;
        }
        )}
      <Link to={`/skill/${lastSkill.trim()}`}>{lastSkill.trim()}</Link>.
      </p>
      <p>{job.yoe}</p>
    </>
  );
  
  let card = ref
    ? <div className="JobCardBySkill" ref={ref}>{cardBody}</div>
    : <div className="JobCardBySkill">{cardBody}</div>;

  return card;
});

export default JobCardBySkill;