export const GET_ALL_STORYBOARDS = `
  query {
    storyboards {
      nodes {
        id
        title
        description
      }
    }
  }
`;

export const GET_STORYBOARD = `
  query($id: ID!) {
    storyboard(id: $id) {
      id
      title
      description
    }
  }
`;