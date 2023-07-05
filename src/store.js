import { writable } from "svelte/store";

export const locWeather = writable(null)
export const search = writable(false)
export const loc = writable('')