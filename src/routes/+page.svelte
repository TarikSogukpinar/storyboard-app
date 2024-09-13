<script lang="ts">
    /** @type {import('./$types').LayoutData} */
    export let data;

    const {storyboards, error} = data;
</script>

<main class="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-8 flex flex-col items-center justify-center">
    <div class="text-center mb-8">
        <h1 class="text-5xl font-extrabold text-white mb-4">Storyboards List</h1>
        <p class="text-lg text-gray-200">Here are the available storyboards:</p>
    </div>

    <!-- Hata durumu -->
    {#if error}
        <p class="text-lg text-red-500">Error: {error}</p>

        <!-- Storyboards gösterimi -->
    {:else if storyboards.length > 0}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            {#each storyboards as storyboard (storyboard.id)}
                <div class="bg-white border border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
                    <h2 class="text-2xl font-bold text-blue-600 mb-2">{storyboard.title}</h2>
                    <p class="text-lg text-gray-700 mb-4">{storyboard.description}</p>
                    <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors duration-300">
                        View Details
                    </button>
                </div>
            {/each}
        </div>

        <!-- Storyboards yoksa mesaj -->
    {:else}
        <p class="text-lg text-gray-500">No storyboards found.</p>
    {/if}
</main>