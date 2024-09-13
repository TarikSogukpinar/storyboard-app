<script lang="ts">
    import StoryboardForm from "$lib/components/StoryboardForm.svelte";
    export let data; // Data'yı dışarıdan alıyoruz
</script>

<section class="container mx-auto py-8">
    <h1 class="text-3xl font-bold mb-4 bg-amber-100">
        {data?.storyboard ? 'Edit Storyboard' : 'Create Storyboard'}
    </h1>

    <!-- Form bileşenini çağırma -->
    <StoryboardForm
            isEditMode={data?.storyboard ? true : false}
            id={data?.storyboard?.id ?? null}
            initialTitle={data?.storyboard?.title ?? ''}
            initialDescription={data?.storyboard?.description ?? ''}
            initialStatus={data?.storyboard?.status ?? 'draft'}
            initialTags={data?.storyboard?.tags?.join(', ') ?? ''}
    />
</section>