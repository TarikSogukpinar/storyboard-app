<script lang="ts">
    import { onMount } from 'svelte';
    import { GET_STORYBOARD } from '$lib/graphql/queries';
    import { UPDATE_STORYBOARD } from '$lib/graphql/mutations';
    let id: number;
    let title = '';
    let description = '';
    let errorMessage = '';

    // Storyboard detaylarını almak için GraphQL sorgusu
    async function loadStoryboard(id: number) {
        try {
            const response = await fetch('http://78.111.111.77:8090/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: GET_STORYBOARD,
                    variables: { id }
                }),
            });

            const result = await response.json();

            if (result.errors) {
                throw new Error(result.errors[0].message);
            }

            const storyboard = result.data.storyboard;
            title = storyboard.title;
            description = storyboard.description;
        } catch (error) {
            errorMessage = 'Failed to load storyboard: ' + error.message;
        }
    }

    // Güncelleme işlemi
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
                            id,   // ID'yi göndermeye devam ediyoruz
                            patch: { // patch içinde güncellenen alanlar olmalı
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

            // Başarılı güncelleme sonrasında ana sayfaya yönlendirin
            window.location.href = '/';
        } catch (error) {
            errorMessage = 'Failed to update storyboard: ' + error.message;
        }
    }

    // Sayfa yüklendiğinde storyboard detaylarını almak için
    onMount(() => {
        const params = window.location.pathname.split('/');
        id = parseInt(params[params.length - 1], 10);  // ID'yi tam sayıya çeviriyoruz
        if (!isNaN(id)) {
            loadStoryboard(id);  // ID geçerli bir sayıysa storyboard'u yükleyin
        } else {
            errorMessage = 'Invalid storyboard ID';
        }
    });
</script>

<!-- Güncelleme Formu -->
<section class="container mx-auto py-10">
    <h1 class="text-3xl font-bold mb-6 text-center">Storyboard Güncelle</h1>

    {#if errorMessage}
        <p class="text-red-500">{errorMessage}</p>
    {/if}

    <form on:submit|preventDefault={updateStoryboard} class="max-w-lg mx-auto space-y-4">
        <div>
            <label for="title" class="block text-lg font-bold">Başlık</label>
            <input
                    id="title"
                    type="text"
                    bind:value={title}
                    class="w-full p-2 mt-2 border border-gray-200 rounded"
                    required
            />
        </div>

        <div>
            <label for="description" class="block text-lg font-bold">Açıklama</label>
            <textarea
                    id="description"
                    bind:value={description}
                    class="w-full p-2 mt-2 border border-gray-200 rounded"
                    required
            ></textarea>
        </div>

        <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors duration-300">
            Güncelle
        </button>
    </form>
</section>
