export const load = async ({fetch}) => {
  try {
    const query = `
      query {
        allStoryboards {
          nodes {
            id
            title
            description
          }
        }
      }
    `;

    const res = await fetch("http://78.111.111.77:8090/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    console.log(res, 'response durumu')

    if (!res.ok) {
      throw new Error(`Error fetching data: ${res.statusText}`);
    }

    const { data } = await res.json();
    return { storyboards: data.allStoryboards.nodes };
  } catch (error) {
    console.error("Error:", error);
    return { storyboards: [] }; // Return an empty list in case of error
  }
};
