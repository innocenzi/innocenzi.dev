export function readingTimeInMinutes(content: string) {
	const wordsPerMinute = 225
	const words = content.trim().split(/\s+/).length
	const minutes = Math.ceil(words / wordsPerMinute)

	return minutes
}

export function getReadingTime(content: string) {
	const minutes = readingTimeInMinutes(content)

	if (minutes < 1) {
		return 'About a few seconds to read'
	}

	return `About ${minutes} minute${minutes === 1 ? '' : 's'} to read`
}

export function formatDate(date: string | Date) {
	return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(date))
}
