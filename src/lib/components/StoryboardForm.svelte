<script lang="ts">
    import { CREATE_STORYBOARD, UPDATE_STORYBOARD } from '$lib/graphql/mutations';
    export let isEditMode = false;
    export let id: string | null = null;
    export let initialTitle = '';
    export let initialDescription = '';
    export let initialStatus = 'draft'; // Status için varsayılan değer
    export let initialTags = ''; // Tags için varsayılan değer (virgülle ayrılmış)

    let title = initialTitle;
    let description = initialDescription;
    let status = initialStatus;
    let tags = initialTags;
    let error: string | null = null;

    async function submitForm() {
        try {
            const query = isEditMode ? UPDATE_STORYBOARD : CREATE_STORYBOARD;

            // Storyboard inputu için gerekli değişkenler
            const variables = {
                storyboard: {
                    title,
                    description,
                    status,
                    tags: tags.split(',').map(tag => tag.trim()) // Virgülle ayrılmış etiketler
                }
            };

            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query,
                    variables, // Burada doğru yapıyı geçiyoruz
                }),
            });

            if (!response.ok) throw new Error('Form gönderilemedi');

            const result = await response.json();
            if (result.errors) throw new Error(result.errors[0].message);

            // Başarılıysa yönlendirme yap
            window.location.href = '/';
        } catch (err: any) {
            console.error(err);
            error = err.message;
        }
    }
</script>

<form on:submit|preventDefault={submitForm} class="space-y-4">
    <div>
        <label for="title" class="block text-lg font-bold">Title</label>
        <input
                id="title"
                type="text"
                bind:value={title}
                class="w-full p-2 mt-2 border border-gray-200 rounded"
                placeholder="Enter storyboard title"
                required
        />
    </div>

    <div>
        <label for="description" class="block text-lg font-bold">Description</label>
        <textarea
                id="description"
                bind:value={description}
                class="w-full p-2 mt-2 border border-gray-200 rounded"
                placeholder="Enter storyboard description"
                required
        ></textarea>
    </div>

    <div>
        <label for="status" class="block text-lg font-bold">Status</label>
        <select id="status" bind:value={status} class="w-full p-2 mt-2 border border-gray-200 rounded">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
        </select>
    </div>

    <div>
        <label for="tags" class="block text-lg font-bold">Tags</label>
        <input
                id="tags"
                type="text"
                bind:value={tags}
                class="w-full p-2 mt-2 border border-gray-200 rounded"
                placeholder="Enter comma-separated tags"
        />
    </div>

    <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors duration-300">
        {isEditMode ? 'Update' : 'Create'}
    </button>

    {#if error}
        <p class="text-red-500">{error}</p>
    {/if}
</form>
