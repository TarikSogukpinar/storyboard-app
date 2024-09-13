<script>
  // Fetch the storyboards passed from the `load` function in layout.ts
  export let storyboards = [];

  // Tailwind's global CSS file
  import "../app.css";

  let message = "Welcome to TailwindCSS!";
</script>

<main class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
  <div class="text-center mb-8">
    <h1 class="text-4xl font-bold text-blue-600 mb-4">{message}</h1>
    <p class="text-lg text-gray-700">If you see this styled, TailwindCSS is working!</p>
  </div>

  <!-- Display the list of storyboards fetched from the API -->
  {#if storyboards.length > 0}
    <ul>
      {#each storyboards as storyboard}
        <li class="border border-gray-300 p-4 rounded mb-4">
          <h2 class="text-2xl font-bold text-blue-600 mb-2">{storyboard.title}</h2>
          <p class="text-lg text-gray-700">{storyboard.description}</p>
        </li>
      {/each}
    </ul>
  {:else}
    <p class="text-lg text-gray-700">No storyboards found.</p>
  {/if}

  <!-- Add the <slot /> tag to render child routes -->
  <slot />
</main>