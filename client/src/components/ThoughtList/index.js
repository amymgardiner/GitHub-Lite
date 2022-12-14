import React from 'react';
import { Link } from 'react-router-dom';

const ThoughtList = ({ thoughts, title }) => {
  if (!thoughts.length) {
    return <h3>No Projects Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3">
            <h4 className="card-header">{thought.title}</h4>
            <div className="card-body2">
              <Link to={`/thought/${thought._id}`}>
                <p>{thought.thoughtText}</p>
              </Link>
              <div className="thought-link">
                <a href={thought.link} className="thought-link">
                  {thought.link}
                </a>
              </div>
              <br></br>
              <p className="thought-tag">Technologies used: {thought.tag}</p>
              <br></br>
              <Link to={`/thought/${thought._id}`}>
                <p className="mb-0">
                  Comments: {thought.reactionCount} || Click to{' '}
                  {thought.reactionCount ? 'see' : 'start'} the discussion!
                </p>
              </Link>
              <p className="card-footer">
                {' '}
                <Link
                  to={`/profile/${thought.username}`}
                  style={{ fontWeight: 700 }}
                  className="text-light"
                >
                  {thought.username}
                </Link>{' '}
                posted on {thought.createdAt}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
