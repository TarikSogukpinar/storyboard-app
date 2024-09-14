export const CREATE_STORYBOARD = `
  mutation CreateStoryboard($storyboard: StoryboardInput!) {
  createStoryboard(input: { storyboard: $storyboard }) {
    storyboard {
      id
      title
      description
      status
      tags
    }
  }
}
`;

export const UPDATE_STORYBOARD = `
  mutation($id: ID!, $title: String!, $description: String!) {
    updateStoryboard(id: $id, input: { title: $title, description: $description }) {
      storyboard {
        id
        title
        description
      }
    }
  }
`;

export const DELETE_STORYBOARD = `
 mutation DeleteStoryboard($input: DeleteStoryboardInput!) {
  deleteStoryboard(input: $input) {
    storyboard {
      id
    }
  }
}
`;