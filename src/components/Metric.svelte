<script>
	import Icon from "@iconify/svelte"

    // export let Icon
    export let text = '75%'
    export let name = 'Humidity'
    export let icon = 'material-symbols:question-mark'
</script>

<div class="flex flex-col items-center justify-around space-y-2">
    <Icon icon={icon} color="#882ADC" width=20/>
    <p class="text-md font-semibold">{text}</p>
    <p class="text-xs text-gray-700/50 font-semibold">{name}</p>
</div>