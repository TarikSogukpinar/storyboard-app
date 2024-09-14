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

export const DELETE_STORYBOARD = `
 mutation DeleteStoryboard($input: DeleteStoryboardInput!) {
  deleteStoryboard(input: $input) {
    storyboard {
      id
    }
  }
}
`;

export const UPDATE_STORYBOARD = `
 mutation UpdateStoryboard($input: UpdateStoryboardInput!) {
  updateStoryboard(input: $input) {
    storyboard {
      id
      title
      description
    }
  }
}
`;