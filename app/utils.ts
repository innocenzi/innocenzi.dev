export interface Activity {
	date: string
	count: number
	level: number
}

interface GitHubContributionsResponse {
	contributions: Activity[]
}

export async function getGitHubContributions() {
	const res = await fetch(`https://github-contributions-api.jogruber.de/v4/innocenzi?y=last`)
	const data = (await res.json()) as GitHubContributionsResponse

	return data.contributions
}
