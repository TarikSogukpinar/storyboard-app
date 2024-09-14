<script lang="ts">
    import {DELETE_STORYBOARD} from '$lib/graphql/mutations';
    import {onMount} from 'svelte';
    import {createEventDispatcher} from 'svelte';
    import {TOTAL_COUNT} from "$lib/graphql/queries";

    const apiUrl = import.meta.env.VITE_API_URL;
    let errorMessage = '';
    let loading = true;
    let totalCount = 0;
    export let storyboards: {
        id: number;
        title: string;
        description: string,
        createdAt: string,
        updatedAt: string
    }[] = [];


    const dispatch = createEventDispatcher();

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    onMount(async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            loading = false;
        } catch (error: any) {
            console.error('Data not loaded', error);
            error = error.message;
            loading = false;
        }
    });

    async function handleDelete(id: number) {
        try {
            const deleteStoryboardResponse = await fetch(`${apiUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: DELETE_STORYBOARD,
                    variables: {input: {id}}
                }),
            });

            const result = await deleteStoryboardResponse.json();

            if (result.errors) {
                throw new Error(result.errors[0].message);
            }

            dispatch('deleteStoryboard', {id});
        } catch (error: any) {
            console.error('Delete operation failed:', error);
            error = error.message;
        }
    }

    onMount(async () => {
        try {
            const totalStoryBoardCountResponse = await fetch(`${apiUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: TOTAL_COUNT
                }),
            });

            const result = await totalStoryBoardCountResponse.json();

            if (result.errors) {
                throw new Error(result.errors[0].message);
            }

            storyboards = result.data.storyboards.nodes;
            totalCount = result.data.storyboards.totalCount;
            loading = false;
        } catch (error: any) {
            console.error('Data not loaded', error);
            error = error.message;
            loading = false;
        }
    });
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
    <div>
        <p class="text-lg text-white mb-6">Total Storyboards: {totalCount}</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 rounded-3xl text-white">
            {#each storyboards as storyboard (storyboard.id)}
                <div class="bg-white rounded-2xl p-6 hover:shadow-3xl transition-shadow duration-300">
                    <h2 class="text-2xl font-semibold text-gray-950 mb-2">Title : {storyboard.title}</h2>
                    <p class="text-gray-950 mb-4 font-bold">Desc: {storyboard.description}</p>
                    <p class="text-gray-950 mb-4 font-bold">Created Date: {formatDate(storyboard.createdAt)}</p>
                    <p class="text-gray-950 mb-4 font-bold">Updated Date: {formatDate(storyboard.updatedAt)}</p>
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
    </div>

{/if}

{#if !loading && storyboards.length === 0}
    <div class="text-center text-white mt-10">
        <p class="text-2xl font-semibold mt-4">No found storyboards!</p>
    </div>
{/if}