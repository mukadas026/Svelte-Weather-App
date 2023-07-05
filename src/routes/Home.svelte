<script>
	import Icon from "@iconify/svelte"
	import Card from "../components/Card.svelte"
	import Metric from "../components/Metric.svelte"
	import MiniCard from "../components/MiniCard.svelte"

	import * as trans from "svelte/transition"
	import { formatter } from "../utils/timeFormatter"
	import { navigate } from "svelte-routing"
	import { search, locWeather } from "../store"
	import SearchComp from "../components/SearchComp.svelte"
	import MiniCardContainer from "../components/MiniCardContainer.svelte"

	// let date = '', time = ''

	if (!$locWeather) {
		navigate("/search")
	}

	const { dateString, timeString } = formatter($locWeather.location.localtime)

	const handleSearch = (e) => {
		$search = true
	}
	const humidity = $locWeather.current.humidity
	const wind = $locWeather.current.wind_mph
	const airPressure = $locWeather.current.pressure_mb
	const visibility = $locWeather.current.vis_miles


	const metricData = [
		{
			icon: "ion:water-sharp",
			text: `${humidity}%`,
			name: "Humidity",
		},
		{
			icon: "svg-spinners:wind-toy",
			text: `${wind}Mph`,
			name: "Wind",
		},
		{
			icon: "mdi:gauge",
			text: `${airPressure}mb`,
			name: "Air pressure",
		},
		{
			icon: "mdi:eye",
			text: `${visibility}mi`,
			name: "Visibility",
		},
	]
</script>

{#if $locWeather}
	<main class="w-screen min-h-screen bg-gradient-to-b from-purple-200">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="flex justify-center px-4 items-end pt-2">
			<span on:click={handleSearch}
				><Icon
					icon="zondicons:search"
					height={30}
				/></span
			>
		</div>
		{#if $search}
			<SearchComp />
		{/if}
		<section class="w-full h-32 flex flex-col items-center justify-center">
			<h2 class="text-4xl font-semibold">{$locWeather.location?.name}</h2>
			<p class="text-md">As at {timeString}</p>
		</section>
		<section class="w-full flex items-center justify-around">
			<Card date={dateString} />
		</section>
		<div
			class="w-4/5 relative z-10 mx-auto min-h-[120px] bg-white shadow-2xl rounded-2xl flex items-center justify-around my-8"
		>
			{#each metricData as {name, icon, text} (name)}
				<Metric {name} {text} {icon}/>
			{/each}
		</div>

		<section class="relative z-1 -mt-20 py-5 pt-20 w-full bg-gradient-to-b from-purple-200 to-purple-100">
			<div class="w-full h-8 px-4 flex justify-between font-semibold">
				<p>Today</p>
				<p>Next 7 Days ></p>
			</div>
			<div class="w-full overflow-x-auto relative">
				<MiniCardContainer />
			</div>
		</section>
	</main>
{/if}
