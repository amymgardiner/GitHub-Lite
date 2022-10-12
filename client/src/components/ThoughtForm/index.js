import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_THOUGHT } from '../../utils/mutations';
import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries';

const ThoughtForm = () => {
  const [formState, setFormState] = useState({
    title: '',
    thoughtText: '',
    link: '',
    tag: '',
  });

  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    update(cache, { data: { addThought } }) {
      // could potentially not exist yet, so wrap in a try/catch
      try {
        // update me array's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
        });
      } catch (e) {
        console.warn('First thought insertion by user!');
      }

      // update thought array's cache
      const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });
      cache.writeQuery({
        query: QUERY_THOUGHTS,
        data: { thoughts: [addThought, ...thoughts] },
      });
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // add thought to database
      await addThought({
        variables: { ...formState },
      });

      // clear form value
      setFormState('');
      console.log(...formState);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <input
          className="form-input"
          placeholder="Title"
          name="title"
          type="title"
          id="title"
          value={formState.title}
          onChange={handleChange}
        />
        <input
          className="form-input"
          placeholder="Description"
          name="thoughtText"
          type="thoughtText"
          id="thoughtText"
          value={formState.thoughtText}
          onChange={handleChange}
        />
        <input
          className="form-input"
          placeholder="Link"
          name="link"
          type="link"
          id="link"
          value={formState.link}
          onChange={handleChange}
        />
        <input
          className="form-input"
          placeholder="Category"
          name="tag"
          type="tag"
          id="tag"
          value={formState.tag}
          onChange={handleChange}
        />
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ThoughtForm;
