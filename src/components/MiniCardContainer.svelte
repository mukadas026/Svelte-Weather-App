<script>
	import { Spinner } from "flowbite-svelte"
	import { loc } from "../store"
	import MiniCard from "./MiniCard.svelte"

	const getForcast = async () => {
		const api_key = import.meta.env.VITE_APP_API_KEY
		try {
			const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${$loc}`)
			// console.log(res)
			if (res.status === 200) {
				const data = await res.json()
				// console.log(data)
				return data.forecast.forecastday[0].hour
			} else {
				throw "couldnt fetch data"
			}
		} catch (err) {
			console.log(err)
		}
	}
	getForcast()
</script>

<div class="flex h-42 min-w-full w-max items-center justify-around relative">
	{#await getForcast()}
		{#each [0, 1, 2, 3] as placeholder (placeholder)}
			<Spinner />
		{/each}
	{:then hourly}
		{#each hourly as {time, temp_c, condition}}
			<MiniCard {time} {temp_c} {condition}/>
		{/each}
	{/await}
</div>
