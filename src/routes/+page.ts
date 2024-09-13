/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    const query = `
    {
      storyboards {
        nodes {
          id
          title
          description
        }
      }
    }
  `;

    try {
        const response = await fetch('http://78.111.111.77:8090/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch storyboards: ${response.statusText}`);
        }

        const data = await response.json();
        return {
            storyboards: data?.data?.storyboards?.nodes || [],
        };
    } catch (error) {
        console.log(error);
    }
}
