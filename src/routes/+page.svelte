<script lang="ts">
  import { onMount } from 'svelte';
  import { createStoryboard } from '$lib/api/graphql/createStoryboard';  // Daha önce tanımladığınız GraphQL client'ı kullanın
  import { gql } from '@urql/svelte';

  let storyboards = [];
  let newTitle = '';
  let newDescription = '';

  const GET_STORYBOARDS = gql`
    query {
      storyboards {
        id
        title
        description
      }
    }
  `;

  const CREATE_STORYBOARD = gql`
    mutation($title: String!, $description: String!) {
      insert_storyboards(objects: { title: $title, description: $description }) {
        returning {
          id
          title
        }
      }
    }
  `;

  onMount(async () => {
    const result = await createStoryboard.query(GET_STORYBOARDS).toPromise();
    if (!result.error) {
      storyboards = result.data.storyboards;
    } else {
      console.error(result.error);
    }
  });

  async function addStoryboard() {
    const result = await createStoryboard.mutation(CREATE_STORYBOARD, { title: newTitle, description: newDescription }).toPromise();
    if (!result.error) {
      storyboards = [...storyboards, result.data.insert_storyboards.returning[0]];
      newTitle = '';
      newDescription = '';
    } else {
      console.error(result.error);
    }
  }
</script>

<svelte:head>
  <title>Story Board App</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<!-- Welcome mesajı -->
<section class="text-center py-8">
  <h1 class="text-4xl font-bold text-blue-600">Welcome to Story Board App</h1>
</section>

<!-- Storyboards Listeleme -->
<main class="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
  <h2 class="text-2xl font-semibold mb-4">Available Storyboards</h2>
  <ul class="space-y-4 mb-6">
    {#each storyboards as storyboard}
      <li class="border-b pb-4">
        <span class="font-bold text-lg">{storyboard.title}</span> - {storyboard.description}
      </li>
    {/each}
  </ul>

  <!-- Storyboard Ekleme Formu -->
  <h2 class="text-2xl font-semibold mb-4">Add New Storyboard</h2>
  <form on:submit|preventDefault={addStoryboard} class="space-y-4">
    <input
            type="text"
            bind:value={newTitle}
            placeholder="Title"
            required
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <textarea
            bind:value={newDescription}
            placeholder="Description"
            required
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    ></textarea>
    <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
    >
      Add Storyboard
    </button>
  </form>
</main>

<style>
  main {
    margin: 2rem 0;
  }
</style>
