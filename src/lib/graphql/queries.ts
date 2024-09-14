export const GET_ALL_STORYBOARDS = `
  query {
    storyboards {
      nodes {
        id
        title
        description
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_STORYBOARD = `
  query($id: Int!) {
    storyboard(id: $id) {
      id
      title
      description
    }
  }
`;