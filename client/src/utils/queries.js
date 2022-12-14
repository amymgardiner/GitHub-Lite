import { gql } from '@apollo/client';

export const QUERY_THOUGHTS = gql`
  query thoughts($username: String) {
    thoughts(username: $username) {
      _id
      title
      thoughtText
      link
      tag
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_THOUGHT = gql`
  query thought($id: ID!) {
    thought(_id: $id) {
      _id
      title
      thoughtText
      link
      tag
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      fullname
      email
      friendCount
      friends {
        _id
        username
      }
      thoughts {
        _id
        title
        thoughtText
        link
        tag
        createdAt
        reactionCount
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      fullname
      email
      friendCount
      thoughts {
        _id
        title
        thoughtText
        link
        tag
        createdAt
        reactionCount
        reactions {
          _id
          createdAt
          reactionBody
          username
        }
      }
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      fullname
      email
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;
