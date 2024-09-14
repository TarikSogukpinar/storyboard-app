<script lang="ts">
    import {onMount} from 'svelte';
    import {GET_STORYBOARD} from '$lib/graphql/queries';
    import {UPDATE_STORYBOARD} from '$lib/graphql/mutations';

    let id: number;
    let title = '';
    let description = '';
    let errorMessage = '';

    async function loadStoryboard(id: number) {
        try {
            const response = await fetch('http://78.111.111.77:8090/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: GET_STORYBOARD,
                    variables: {id}
                }),
            });

            const result = await response.json();

            if (result.errors) {
                throw new Error(result.errors[0].message);
            }

            const storyboard = result.data.storyboard;
            title = storyboard.title;
            description = storyboard.description;
        } catch (error: any) {
            errorMessage = 'Failed to load storyboard: ' + error.message;
        }
    }

    async function updateStoryboard() {
        try {
            const response = await fetch('http://78.111.111.77:8090/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: UPDATE_STORYBOARD,
                    variables: {
                        input: {
                            id,
                            patch: {
                                title,
                                description
                            }
                        }
                    }
                }),
            });

            const result = await response.json();

            if (result.errors) {
                throw new Error(result.errors[0].message);
            }

            window.location.href = '/';
        } catch (error: any) {
            errorMessage = 'Failed to update storyboard: ' + error.message;
        }
    }

    onMount(() => {
        const params = window.location.pathname.split('/');
        id = parseInt(params[params.length - 1], 10);
        if (!isNaN(id)) {
            loadStoryboard(id);
        } else {
            errorMessage = 'Invalid storyboard ID';
        }
    });
</script>

<section class="container mx-auto py-10">
    <h1 class="text-3xl font-bold mb-6 text-center text-white">Update Storyboard</h1>

    {#if errorMessage}
        <p class="text-red-500">{errorMessage}</p>
    {/if}

    <form on:submit|preventDefault={updateStoryboard}
          class="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg space-y-6">
        <div>
            <label for="title" class="block text-lg font-semibold mb-2">Title</label>
            <input
                    id="title"
                    type="text"
                    bind:value={title}
                    class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
                    required
            />
        </div>

        <div>
            <label for="description" class="block text-lg font-semibold mb-2">Description</label>
            <textarea
                    id="description"
                    bind:value={description}
                    class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
                    required
            ></textarea>
        </div>

        <button class="w-full bg-gray-950 text-white py-3 rounded-md hover:bg-green-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md transition-colors duration-200">
            Update
        </button>
    </form>
</section>
