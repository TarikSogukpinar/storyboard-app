<script lang="ts">
  // Load fonksiyonundan gelen storyboards verisini almak için
  export let storyboards: { id: number; title: string; description: string }[] = [];

  // Gelen veriyi kontrol edelim
  if (storyboards.length > 0) {
    console.log("İlk storyboard title:", storyboards[0].title);  // İlk storyboard'un başlığını göster
  } else {
    console.log("Storyboards dizisi boş.");  // Eğer storyboards boşsa bir mesaj göster
  }
</script>

<main class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
  <div class="text-center mb-8">
    <h1 class="text-4xl font-bold text-blue-600 mb-4">Storyboards List</h1>
  </div>

  <!-- Gelen storyboards listesini göster -->
  {#if storyboards.length > 0}
    <ul class="w-full max-w-lg">
      {#each storyboards as storyboard (storyboard.id)}
        <li class="border border-gray-300 p-4 rounded mb-4 shadow-lg">
          <h2 class="text-2xl font-bold text-blue-600 mb-2">{storyboard.title}</h2>
          <p class="text-lg text-gray-700">{storyboard.description}</p>
        </li>
      {/each}
    </ul>
  {:else}
    <p class="text-lg text-gray-700">No storyboards found.</p>
  {/if}

  <slot />
</main>