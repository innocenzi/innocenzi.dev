export function formatDate(date: string | Date) {
	if (!date) {
		return ''
	}

	return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(date))
}
