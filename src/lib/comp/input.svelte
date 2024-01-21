<script lang="ts">
    export  let label:string
    export let type:string = "text";
    export let name:string

    let id = Math.round(Math.random() *3444788).toString(32)

    
</script>

<div class="relative mb-4">
	<label for="email" class="leading-7 text-sm text-gray-600">{label}</label>
	<input {type} {id} {name} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
</div>
