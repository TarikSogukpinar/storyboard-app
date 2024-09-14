<script lang="ts">
    import { DELETE_STORYBOARD } from '$lib/graphql/mutations'; // GraphQL DELETE mutation'ı
    export let storyboards: { id: number; title: string; description: string }[] = [];

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    let errorMessage = '';  // Hata mesajını göstermek için

    // Silme işlemi için GraphQL sorgusu
    async function handleDelete(id: number) {
        try {
            const response = await fetch('http://78.111.111.77:8090/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: DELETE_STORYBOARD,
                    variables: { input: { id } }  // id'yi input nesnesi içinde geçiriyoruz
                }),
            });

            const result = await response.json();

            if (result.errors) {
                throw new Error(result.errors[0].message);
            }

            // Silme işlemi başarılıysa, ana bileşene silme olayı gönderiyoruz
            dispatch('deleteStoryboard', { id });
        } catch (error) {
            console.error('Delete operation failed:', error);
            errorMessage = error.message; // Hata mesajını kaydet
        }
    }
</script>

<!-- Hata Mesajı -->
{#if errorMessage}
    <p class="text-red-500">{errorMessage}</p>
{/if}

<!-- Storyboard Listesi -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 rounded-3xl text-white">
    {#each storyboards as storyboard (storyboard.id)}
        <div class="bg-white border border-gray-200 rounded-lg shadow-xl p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 class="text-2xl font-semibold text-blue-600 mb-2">{storyboard.title}</h2>
            <p class="text-gray-700 mb-4">{storyboard.description}</p>
            <div class="flex justify-between items-center">
                <!-- Silme butonu, handleDelete fonksiyonunu tetikliyor -->
                <button on:click={() => handleDelete(storyboard.id)} class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition duration-300">
                    Sil
                </button>
                <!-- Düzenleme linki -->
                <a href={`/storyboards/${storyboard.id}`} class="text-blue-600 hover:underline">Düzenle</a>
            </div>
        </div>
    {/each}
</div>