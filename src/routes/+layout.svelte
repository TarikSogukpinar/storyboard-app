<script>
  import "../app.css";  // Tailwind'in bulunduğu global CSS dosyası
  let message = "Welcome to TailwindCSS!";
</script>

<main class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="text-center">
    <h1 class="text-4xl font-bold text-blue-600 mb-4">{message}</h1>
    <p class="text-lg text-gray-700">If you see this styled, TailwindCSS is working!</p>
  </div>
</main>