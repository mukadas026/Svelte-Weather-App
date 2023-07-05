<script>
	import { Router, Route, navigate } from "svelte-routing"
	import Home from "./routes/Home.svelte"
	import PageNotFound from "./routes/PageNotFound.svelte"
	import Search from "./routes/Search.svelte"
	import { locWeather } from "./store"

	console.log($locWeather)
    if($locWeather === null){
        navigate('/search')
    }

</script>

<Router>
	<Route
		path="/"
		component={Home}
	/>
	<Route
		path="/search"
		component={Search}
	/>
	<Route
		path="*"
		component={PageNotFound}
	/>
</Router>
