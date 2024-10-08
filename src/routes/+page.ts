import {GET_ALL_STORYBOARDS} from "$lib/graphql/queries";

/** @type {import('./$types').PageLoad} */
export async function load({fetch}) {
    const apiUrl = import.meta.env.VITE_API_URL;

    const getAllStoryboardResponse = await fetch(`${apiUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({query: GET_ALL_STORYBOARDS}),
    });

    const result = await getAllStoryboardResponse.json();

    if (result.errors) {
        console.error("GraphQL Errors:", result.errors);
        throw new Error(result.errors[0].message);
    }

    return {storyboards: result?.data?.storyboards?.nodes || []};
}