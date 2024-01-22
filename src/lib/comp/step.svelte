<script lang="ts">
	import { getContext, onMount } from "svelte";
	import { steps } from "./store";
	import type { Readable, Writable } from "svelte/store";
	import { slide } from "svelte/transition";
    export let title = "";
    let index:number;
    let active:Writable<string> = getContext("active");
    let activeIndex:Readable<number> = getContext("activeIndex")
    export let slideTo = false
    let id = Math.floor(Math.random() * 37657853628).toString(32)
    $steps.push(id)
    
    onMount(()=>{
        index = $steps.findIndex((val)=>val===id) 
        setTimeout(() => {
            if(!$active||$activeIndex < 1) $active = $steps[slideTo ? index:0];
        }, 100*index);
    })
    
</script>

{#if id == $active}
    <div class="step" {id} in:slide>
        <h3 class="main_question"><strong>{index+1}/{$steps.length}</strong>{title}</h3>
        <slot />
    </div>
{/if}