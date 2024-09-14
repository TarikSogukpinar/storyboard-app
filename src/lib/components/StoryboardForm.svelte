<script lang="ts">
    import {CREATE_STORYBOARD} from '$lib/graphql/mutations';
    import {storyBoardFormSchemaValidation} from "../validation/storyBoardFormSchemaValidation"
    import {UPDATE_STORYBOARD} from "$lib/graphql/mutations";

    export let isEditMode = false;
    export let initialTitle = '';
    export let initialDescription = '';
    export let initialStatus = 'draft';
    export let initialTags = '';

    let title = initialTitle;
    let description = initialDescription;
    let status = initialStatus;
    let tags = initialTags;
    let error: string | null = null;
    let validationErrors: { [key: string]: string } = {};
    const apiUrl = import.meta.env.VITE_API_URL;


    async function submitForm() {
        const formData = {title, description, status, tags};
        const {error} = storyBoardFormSchemaValidation.validate(formData, {abortEarly: false});

        if (error) {
            validationErrors = {};
            error.details.forEach(detail => {
                validationErrors[detail.path[0] as string] = detail.message;
            });
            return;
        }

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

            const createStoryboardFormResponse = await fetch(`${apiUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query,
                    variables,
                }),
            });

            if (!createStoryboardFormResponse.ok) throw new Error('Form could not be sent');

            const result = await createStoryboardFormResponse.json();
            if (result.errors) throw new Error(result.errors[0].message);

            window.location.href = '/';
        } catch (error: any) {
            console.error('Submit form failed', error);
            error = error.message;
        }
    }

</script>

{#if Object.keys(validationErrors).length > 0}
    <div class="mb-5 bg-red-400  text-gray-950 px-4 py-5 pb-10 rounded relative" role="alert">
        <strong class="font-bold">Validation Error!</strong>
        <ul class="mt-2">
            {#each Object.entries(validationErrors) as [field, message]}
                <li class="block sm:inline m-1">{message}</li>
            {/each}
        </ul>
    </div>
{/if}

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
        {isEditMode ? 'Update' : 'Create'}
    </button>

    {#if error}
        <p class="text-red-500 mt-4">{error}</p>
    {/if}
</form>
