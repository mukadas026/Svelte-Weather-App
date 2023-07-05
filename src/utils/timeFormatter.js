export const formatter = (dateTime) => {
    const days = [
        'Sunday', 
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
        ]
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November', 
        'December'
        ]
    const newDate = new Date(dateTime)
    const month = months[newDate.getMonth()]
    const day = days[newDate.getDay()]
    
    const dateString = `${day}, ${newDate.getDate()} ${month} ${newDate.getFullYear()}`
    
    
    const minutes = newDate.getMinutes()
    const hours = newDate.getHours()
    
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const formattedHours = hours > 12 ? (hours % 12) : hours > 0 ? hours : 12
    const amPM = hours >= 12 ? 'PM' : 'AM'
    
    const timeString = `${formattedHours}:${formattedMinutes} ${amPM}`

    return {dateString, timeString}
}