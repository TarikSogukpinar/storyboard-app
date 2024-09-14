<script lang="ts">
    import {DELETE_STORYBOARD} from '$lib/graphql/mutations';
    import {onMount} from 'svelte';

    let loading = true;
    export let storyboards: { id: number; title: string; description: string }[] = [];

    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();
    let errorMessage = '';

    onMount(async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            loading = false;
        } catch (error) {
            errorMessage = 'Data not loaded!';
            loading = false;
        }
    });

    async function handleDelete(id: number) {
        try {
            const response = await fetch('http://78.111.111.77:8090/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: DELETE_STORYBOARD,
                    variables: {input: {id}}
                }),
            });

            const result = await response.json();

            if (result.errors) {
                throw new Error(result.errors[0].message);
            }

            dispatch('deleteStoryboard', {id});
        } catch (error: any) {
            console.error('Delete operation failed:', error);
            errorMessage = error.message;
        }
    }
</script>

{#if errorMessage}
    <p class="text-red-500">{errorMessage}</p>
{/if}

{#if loading}
    <div class="flex justify-center items-center">
        <div class="w-10 h-10 border-2 border-white border-dashed rounded-full animate-spin text-black"></div>
    </div>
{/if}

{#if !loading && storyboards.length > 0}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 rounded-3xl text-white">
        {#each storyboards as storyboard (storyboard.id)}
            <div class="bg-white border border-gray-200 rounded-lg shadow-xl p-6 hover:shadow-xl transition-shadow duration-300">
                <h2 class="text-2xl font-semibold text-blue-600 mb-2">{storyboard.title}</h2>
                <p class="text-gray-700 mb-4">{storyboard.description}</p>
                <div class="flex justify-between items-center">
                    <button on:click={() => handleDelete(storyboard.id)}
                            class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition duration-300">
                        Sil
                    </button>

                    <a href={`/storyboards/${storyboard.id}`}
                       class="bg-gray-950 text-white px-4 py-2 rounded hover:bg-green-500 transition duration-300">Edit</a>
                </div>
            </div>
        {/each}
    </div>
{/if}

{#if !loading && storyboards.length === 0}
    <div class="text-center text-white mt-10">
        <p class="text-2xl font-semibold mt-4">No found storyboards!</p>
    </div>
{/if}