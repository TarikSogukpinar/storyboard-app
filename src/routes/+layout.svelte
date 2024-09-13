<!-- layout.svelte -->
<script>
    import '../app.css';  // TailwindCSS dosyasını buradan dahil ediyoruz
</script>
<main class="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
    <slot />
</main>