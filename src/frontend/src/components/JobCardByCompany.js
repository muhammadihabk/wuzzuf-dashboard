import '../css/JobCard.css';
import React from 'react';
import { Link } from 'react-router-dom';

const JobCardByCompany = React.forwardRef(({job}, ref) => {
  let skills = job.skills.split(",");
  const lastSkill = skills.pop();
  const lastLink = lastSkill.replaceAll('+', '%2B').replaceAll('#', '%23').replaceAll('/', '%2F').trim();
  const cardBody = (
    <>
      <h2>{job.role}</h2>
      <h3>Skills</h3>
      <p>
        {skills.map((skill, index) => {
          let link = skill.replaceAll('+', '%2B').replaceAll('#', '%23').replaceAll('/', '%2F').trim();
          return <><Link to={`/skill/${link}`} key={index}>{skill.trim()}</Link>, </>;
        }
        )}
      <Link to={`/skill/${lastLink}`} key={lastSkill}>{lastSkill.trim()}</Link>.
      </p>
      <p>{job.yoe}</p>
    </>
  );
  
  let card = ref
    ? <div className="JobCard" ref={ref}>{cardBody}</div>
    : <div className="JobCard">{cardBody}</div>;

  return card;
});

export default JobCardByCompany;