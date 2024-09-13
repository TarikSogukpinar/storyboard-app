export const load = async ({fetch}) => {
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

    const res = await fetch("http://78.111.111.77:8090/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({query}),
    });

    if (!res.ok) {
        throw new Error(`Error fetching data: ${res.statusText}`);
    }

    const json = await res.json();
    console.log("Gelen JSON:", JSON.stringify(json, null, 2));

    const storyboards = json?.data?.storyboards?.nodes ?? [];
    console.log("Storyboards verisi (nodes):", storyboards);

    return {storyboards};
};