<script lang="ts">
    import StoryboardForm from "$lib/components/StoryboardForm.svelte";

    interface Storyboard {
        id: string;
        title: string;
        description: string;
        status: string;
        tags: string[];
    }

    interface Data {
        storyboard?: Storyboard;
    }

    export let data: Data;

</script>

<section class="container mx-auto py-8">
    <h1 class="flex justify-center items-center text-3xl font-bold mb-5 text-white">
        Create Storyboard
    </h1>

    <StoryboardForm
            isEditMode={!!data?.storyboard}
            id={data?.storyboard?.id ?? null}
            initialTitle={data?.storyboard?.title ?? ''}
            initialDescription={data?.storyboard?.description ?? ''}
            initialStatus={data?.storyboard?.status ?? 'draft'}
            initialTags={data?.storyboard?.tags?.join(', ') ?? ''}
    />
</section>
