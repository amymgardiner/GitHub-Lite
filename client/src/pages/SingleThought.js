import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import {
  QUERY_THOUGHT,
  QUERY_THOUGHTS,
  QUERY_USER,
  QUERY_ME,
} from '../utils/queries';
import { DELETE_THOUGHT } from '../utils/mutations';
import ReactionList from '../components/ReactionList';
import ReactionForm from '../components/ReactionForm';
import Auth from '../utils/auth';

const SingleThought = (props) => {
  const { id: thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: thoughtId },
  });

  const thought = data?.thought || {};

  const navigate = useNavigate();

  const [deleteThought, { error }] = useMutation(DELETE_THOUGHT, {
    variables: { id: thoughtId },
    onCompleted: () => navigate('/'),
    refetchQueries: [
      { query: QUERY_THOUGHTS },
      { query: QUERY_USER },
      { query: QUERY_ME },
    ],
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {thought.username}
          </span>{' '}
          thought on {thought.createdAt}
        </p>
        <div className="card-body">
          <p>{thought.title}</p>
          <p>{thought.thoughtText}</p>
          <p>{thought.link}</p>
          <p>{thought.tag}</p>
          <button onClick={deleteThought}>delete</button>
        </div>
      </div>

      {thought.reactionCount > 0 && (
        <ReactionList reactions={thought.reactions} />
      )}

      {Auth.loggedIn() && <ReactionForm thoughtId={thought._id} />}
    </div>
  );
};

export default SingleThought;
