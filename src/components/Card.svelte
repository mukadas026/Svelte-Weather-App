<script>
	import moonCloud from "../assets/moon-cloud.svg"
	import { weatherIconData } from "../data/weatherIconsData"
	import { locWeather } from "../store"
	export let date = ""

	$: temp_c = Math.round($locWeather?.current.temp_c)

	$: iconCode = weatherIconData.filter((data) => data.code === $locWeather?.current.condition.code)[0].icon
	let iconData = ""
	$: {
		import(`../assets/${iconCode}.png`)
			.then((res) => {
				console.log(res.default)
				iconData = res.default
			}) // .then(data => {iconData = data})
			.catch((err) => console.log(err))
		// $:
	}
</script>

<div
	class="w-60 h-80 relative bg-gradient-to-br from-purple-300 via-purple-600 to-purple-700 rounded-3xl flex flex-col items-center justify-center"
>
	<p class="absolute bg-white px-4 py-2 rounded-xl text-sm top-0 -translate-y-1/2">{date}</p>
	<div>
		<img
			src={moonCloud}
			alt="moon cloud"
			width="200"
			height="200"
			class=""
		/>
	</div>
	<div class="flex flex-col items-center justify-around text-white">
		<p class=" text-6xl font-semibold">{temp_c}ºC</p>
		<p class="text-md">{$locWeather?.current.condition.text}</p>
	</div>
</div>
