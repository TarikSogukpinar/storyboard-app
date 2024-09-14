<script lang="ts">
    import {CREATE_STORYBOARD, UPDATE_STORYBOARD} from '$lib/graphql/mutations';

    export let isEditMode = false;
    export let id: string | null = null;
    export let initialTitle = '';
    export let initialDescription = '';
    export let initialStatus = 'draft';
    export let initialTags = '';

    let title = initialTitle;
    let description = initialDescription;
    let status = initialStatus;
    let tags = initialTags;
    let error: string | null = null;

    const apiUrl = import.meta.env.VITE_API_URL;

    async function submitForm() {
        try {
            const query = isEditMode ? UPDATE_STORYBOARD : CREATE_STORYBOARD;

            const variables = {
                storyboard: {
                    title,
                    description,
                    status,
                    tags: tags.split(',').map(tag => tag.trim())
                }
            };

            const response = await fetch(`${apiUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query,
                    variables,
                }),
            });

            if (!response.ok) throw new Error('Form dont send!');

            const result = await response.json();
            if (result.errors) throw new Error(result.errors[0].message);

            window.location.href = '/';
        } catch (err: any) {
            console.error(err);
            error = err.message;
        }
    }
</script>

<!-- Form -->
<form on:submit|preventDefault={submitForm} class="space-y-6 max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg">
    <div>
        <label for="title" class="block text-lg font-semibold mb-2">Title</label>
        <input
                id="title"
                type="text"
                bind:value={title}
                class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
                placeholder="Enter storyboard title"
                required
        />
    </div>

    <div>
        <label for="description" class="block text-lg font-semibold mb-2">Description</label>
        <textarea
                id="description"
                bind:value={description}
                class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
                placeholder="Enter storyboard description"
                required
        ></textarea>
    </div>

    <div>
        <label for="status" class="block text-lg font-semibold mb-2">Status</label>
        <select id="status" bind:value={status}
                class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
        </select>
    </div>

    <div>
        <label for="tags" class="block text-lg font-semibold mb-2">Tags</label>
        <input
                id="tags"
                type="text"
                bind:value={tags}
                class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
                placeholder="Enter comma-separated tags"
        />
    </div>

    <button class="w-full bg-gray-950 text-white py-3 rounded-md hover:bg-green-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md transition-colors duration-200">
        Create
    </button>

    {#if error}
        <p class="text-red-500 mt-4">{error}</p>
    {/if}
</form>