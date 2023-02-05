import { React } from 'react';
import { Link } from 'react-router-dom';

export const JobCardBySkill = ({job}) => {
  // console.log(job);
  // console.log(`JobCardBySkill.js:\n${job.skills}`);
  // console.log(`JobCardBySkill.js is object?: ${job.constructor === Object}`);
  // console.log(`JobCardBySkill.js is array?: ${job.constructor === Array}`);
  // console.log("OPERATING FROM JobCardBySKILL");
  // console.log(`job has skills?: ${Object.hasOwn(job, 'skills')}`);
  // console.log(`job properties: ${Object.keys(job).forEach((prop)=> console.log(prop))}`);
  // console.log(`job from byskill: ${job[4]}`);
  // return;
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