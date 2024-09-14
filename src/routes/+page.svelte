<script lang="ts">
    export let data;
    let {storyboards} = data;

    import StoryboardList from "$lib/components/StoryboardList.svelte";

    function handleDeleteStoryboard(event: CustomEvent) {
        const {id} = event.detail;
        storyboards = storyboards.filter(storyboard => storyboard.id !== id);
    }
</script>

<section class="container mx-auto py-20">

    <h1 class="text-3xl font-bold mb-10 text-center text-white">Storyboard List</h1>

    <StoryboardList {storyboards} on:deleteStoryboard={handleDeleteStoryboard}/>

    <div class="flex justify-center mt-10">
        <a href="/storyboards/new"
           class="bg-gray-950 text-white px-6 py-3 rounded hover:bg-green-700 transition duration-300">
            Create storyboard
        </a>
    </div>
</section>