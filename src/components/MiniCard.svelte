<script>
    import moonCloud from '../assets/moon-cloud.svg'
	import { formatter } from '../utils/timeFormatter'
    export let time
    export let temp_c
    export let condition

    const {timeString} = formatter(time)

</script>

<div class="w-28 h-42 bg-blue-400 rounded-3xl flex flex-col justify-center items-center mx-2 py-2">
    <p>{timeString}</p>
    <img src={moonCloud} alt="moon cloud" width="80">
    <p>{temp_c}ºC</p>
</div>