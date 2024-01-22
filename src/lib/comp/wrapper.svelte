<script lang="ts">
	import { derived, writable } from 'svelte/store';
	import { steps } from './store';
	import { onDestroy, setContext } from 'svelte';
	import { enhance } from '$app/forms';
	import { error } from '@sveltejs/kit';
    const active = writable('');
    setContext('active', active);   
    onDestroy(()=>{
        $steps = []
    }) 
	const Go = (dir: number) => {
		if (dir >= 0 && dir <= $steps.length) {
			$active = $steps[dir];
		}
	};
    let errors:boolean[] = []

	export const formHasError = () => {
		const step = document.getElementById($active);
        
        errors = []
		const requiredFields = step?.querySelectorAll<HTMLInputElement>('input');
            
		let hasError = false;

		requiredFields?.forEach((el) => {
            if (el.type == "checkbox" || el.type == "radio") {
				let name = el.name;
				let first = document.getElementsByName(name)[0];

				if(el !== first) return
			}

			if (!el.checkValidity()) {
				hasError = true;
				if (el.classList.contains("error")) {
					return
				}
                el.classList.add("error")
                el.insertAdjacentHTML("afterend",`<span class="error">${el.validationMessage}</span>`)
			}else{
				el.classList.remove("error")
				if (el.nextElementSibling?.matches("span.error")) {
					el.nextElementSibling.remove()
				}
			}
            errors.push(hasError)
		});
	};

	const Next = () => {
        formHasError();
        const noError = errors.every((val)=>!val)
        
		if (($activeIndex >= 0 && $activeIndex < $steps.length - 1)&& noError) {
			Go($activeIndex + 1);
		}
	};

	const Prev = () => {
		if ($activeIndex > 0) {
			Go($activeIndex - 1);
		}
	};

	const activeIndex = derived(active, (active) => {
		return $steps.findIndex((val) => {
			return val === active;
		});
	});
	let submitting = false
	setContext("activeIndex",activeIndex)

	$:progress = ($activeIndex/($steps.length-1))*100
</script>

<div id="wizard_container">
	<div id="top-wizard">
		<div id="progressbar" class="h-0.5 w-full bg-transparent">
			<div class="h-full bg-[#63c] transition-all duration-200 ease-in-out" style="width: {progress}%;"></div>
		</div>
	</div>
	<form action="" method="post" id="form" use:enhance={() => {
		submitting = true

		return async ({ result, update }) => {
			submitting = false
			document.location.href = "https://potskolu.net/4/3768619"
		}
  }}
>
		<div class="" id="middle-wizard">
			<slot />
		</div>
	</form>
	<div id="bottom-wizard">
		<button type="button" on:click={Prev} disabled={$activeIndex === 0} class="backward"
			>Prev</button
		>
		<button
			type="button"
			on:click={Next}
			disabled={$activeIndex === $steps.length - 1}
			class="forward">Next</button
		>
		<button type="submit" name="process" disabled={$activeIndex !== $steps.length - 1} class="submit" form="form">{submitting?"Submiting...":"Submit"}</button>
	</div>
	<!-- /bottom-wizard -->
</div>
