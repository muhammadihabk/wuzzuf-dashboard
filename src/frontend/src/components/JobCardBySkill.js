import '../css/JobCard.css';
import React from 'react';
import { Link } from 'react-router-dom';

const JobCardBySkill = React.forwardRef(({job, setPageNum}, ref) => {
  let skills = job.skills.split(",");
  const lastSkill = skills.pop();
  const lastLink = lastSkill.replaceAll('+', '%2B').replaceAll('#', '%23').replaceAll('/', '%2F').trim();
  const handleLink = () => {
    setPageNum(0);
  };
  const cardBody = (
    <>
      <h2>{job.role}</h2>
      <h2><Link to={`/company/${job.company}`} onClick={handleLink}>{job.company}</Link></h2>
      <h3>Skills</h3>
      <p>
        {skills.map((skill, index) => {
          let link = skill.replaceAll('+', '%2B').replaceAll('#', '%23').replaceAll('/', '%2F').trim();
          return <span key={job.id+index}><Link to={`/skill/${link}`} onClick={handleLink}>{skill.trim()}</Link>, </span>;
        }
        )}
      <Link to={`/skill/${lastLink}`} key={job.id} onClick={handleLink}>{lastSkill.trim()}</Link>.
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