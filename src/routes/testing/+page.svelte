<script lang="ts">
    import Step from '$lib/comp/step.svelte';
    import Wrapper from '$lib/comp/wrapper.svelte';
</script>

<Wrapper>
    {#each [1,2,3,4,5,6] as item}
        <Step>{item}</Step>
    {/each}
</Wrapper>