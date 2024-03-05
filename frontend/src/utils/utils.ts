export const capitalize = (str: string) => {
    return str.replace(/^\w/, c => c.toUpperCase())
}

export const formatDate = (date: string) => {
    return new Date(date).toDateString()
}

export const formatFullDateTime = (date: string) => {
    // Returns date in the format: "Monday, 1st January, 2021 12:00 AM"
    const d = new Date(date)
    const day = d.getDate()
    const month = d.toLocaleString('default', { month: 'long' })
    const year = d.getFullYear()
    const time = d.toLocaleTimeString()
    return `${d.toLocaleString('default', { weekday: 'long' })}, ${day}${getOrdinal(day)} ${month}, ${year} at ${time}`
}

export const formatDateTime = (date: string) => {
    return new Date(date).toLocaleString()
}

export const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString()
}
function getOrdinal(day: number) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}


