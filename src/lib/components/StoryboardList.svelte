<script lang="ts">
    export let storyboards: { id: number; title: string; description: string }[] = [];

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function handleDelete(id: number) {
        dispatch('deleteStoryboard', { id });
    }
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 rounded-3xl text-white">
    {#each storyboards as storyboard (storyboard.id)}
        <div class="bg-white border border-gray-200 rounded-lg shadow-xl p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 class="text-2xl font-semibold text-blue-600 mb-2">{storyboard.title}</h2>
            <p class="text-gray-700 mb-4">{storyboard.description}</p>
            <div class="flex justify-between items-center">
                <button on:click={() => handleDelete(storyboard.id)} class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition duration-300">
                    Sil
                </button>
                <a href={`/storyboards/${storyboard.id}`} class="text-blue-600 hover:underline">Düzenle</a>
            </div>
        </div>
    {/each}
</div>