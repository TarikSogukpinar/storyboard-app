import { GET_ALL_STORYBOARDS } from "$lib/graphql/queries";

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    const response = await fetch('http://78.111.111.77:8090/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: GET_ALL_STORYBOARDS }),
    });

    const result = await response.json();

    if (result.errors) {
        console.error("GraphQL Errors:", result.errors);
        throw new Error(result.errors[0].message);
    }

    return { storyboards: result?.data?.storyboards?.nodes || [] };
}