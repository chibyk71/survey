import { writable } from "svelte/store";

export const steps = writable<string[]>([])