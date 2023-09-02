export const getTime = (timeString: string, outputUnit: string = 'ms') => {
    const regex = /^(\d+)([smhd])$/ // Regex to match strings like '1s', '2m', '3h', '4d'
    const match = timeString.match(regex)

    if (!match) {
        throw new Error('Invalid time string format')
    }

    const value = parseInt(match[1])
    const unit = match[2]

    switch (unit) {
        case 's':
            return outputUnit === 's' ? value : value * 1000 // Convert seconds to seconds or milliseconds
        case 'm':
            return outputUnit === 's' ? value * 60 : value * 60 * 1000 // Convert minutes to seconds or milliseconds
        case 'h':
            return outputUnit === 's' ? value * 60 * 60 : value * 60 * 60 * 1000 // Convert hours to seconds or milliseconds
        case 'd':
            return outputUnit === 's' ? value * 24 * 60 * 60 : value * 24 * 60 * 60 * 1000 // Convert days to seconds or milliseconds
        default:
            throw new Error('Invalid time unit')
    }
}
