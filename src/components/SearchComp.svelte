<script>
	import { fade, scale } from "svelte/transition"
	import { locWeather, search, loc } from "../store"
	import Icon from "@iconify/svelte"
	import { navigate } from "svelte-routing"
	import { Spinner } from 'flowbite-svelte'

	$loc = ""
	let loading = false

	const disableSearch = (e) => {
		e.stopPropagation()
		const parent = document.querySelector("#parent")
		if (e.target !== parent) return
		$search = false
	}
	const handleSubmit = async (e) => {
		$search = false
		loading = true
		const api_key = import.meta.env.VITE_APP_API_KEY
		try {
			const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${$loc}`)
			console.log(res.status, res.statusText)
			if (res.status == 200) {
				const data = await res.json()
				$locWeather = data
				console.log(data, $locWeather === null)
				// console.log($locWeather)
				loading = false
				navigate("/")
			} else {
				loading = false
				navigate("/search")
				console.log(res)
			}
		} catch (err) {
			loading = false
			navigate("/search")
			
			console.log(err)
		}
		// $loc = ''
	}
</script>

<main>
	{#if loading}
	<div in:fade class="fixed top-0 left-0 z-[1000] w-screen h-screen bg-purple-700/60 flex items-center justify-center">
		<Spinner size=14/>
	</div>
	{/if}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		transition:fade
		class="fixed w-screen h-screen top-0 left-0 bg-black/40 z-[100]"
		on:click|stopPropagation={disableSearch}
		id="parent"
	>
		<div
			transition:scale
			class="absolute w-4/5 h-96 bg-blue-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl"
		>
			<form
				action=""
				class="w-4/5 h-max relative z-[1010] mx-auto top-10"
				on:submit|preventDefault={handleSubmit}
			>
				<!-- <div class=""> -->
				<input
					type="text"
					placeholder="Search"
					bind:value={$loc}
					class="block w-full h-10 mx-auto rounded-md bg-transparent pr-16 relative z-20 indent-2 placeholder:text-xl placeholder:text-white/0 focus:placeholder:text-white/0 peer outline-0 focus:ring-2 shadow-md focus:ring-red-700"
				/>
				<div class="absolute w-full h-full top-0 left-0 bg-white rounded-md" />
				<span
					class="absolute z-10 top-1/2 -translate-y-1/2 left-2 text-xl opacity-100 peer-focus:opacity-100 peer-focus:-translate-y-[170%] transition-all"
					>Search</span
				>
				<button class="absolute z-30 top-1/2 -translate-y-1/2 right-2"
					><Icon
						icon="zondicons:search"
						height={20}
					/></button
				>
				<!-- </div> -->
			</form>
		</div>
	</div>
</main>
