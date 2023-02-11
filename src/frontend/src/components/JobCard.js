import '../css/JobCard.css';
import React from 'react';
import { Link } from 'react-router-dom';

const JobCardBySkill = React.forwardRef(({job, setPageNum, setFilter, pageKind}, ref) => {
  const skills = job.skills.split(",");
  const lastSkill = skills.pop();

  const handleLink = (e) => {
    setPageNum(0);
    setFilter(e.target.innerText);
  };

  const cardBody = (
    <>
      <h2>{job.role}</h2>
      {pageKind === 'skill' && <h2><Link to={`/company/${job.company.replaceAll('/', '%2F').replaceAll('#', '%23').trim()}`} onClick={handleLink}>{job.company.trim()}</Link></h2>}
      <h3>Skills</h3>
      <p>
        {skills.map((skill, index) => {
          return <span key={job.id+index}><Link to={`/skill/${skill.replaceAll('/', '%2F').replaceAll('#', '%23').trim()}`} onClick={handleLink}>{skill.trim()}</Link>, </span>;
        }
        )}
        <Link to={`/skill/${lastSkill.replaceAll('/', '%2F').replaceAll('#', '%23').trim()}`} key={job.id} onClick={handleLink}>{lastSkill.trim()}</Link>.
      </p>
      <p>{job.yoe}</p>
    </>
  );
  
  let card = ref
    ? <div className="JobCard" ref={ref}>{cardBody}</div>
    : <div className="JobCard">{cardBody}</div>;

  return card;
});

export default JobCardBySkill;