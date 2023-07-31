import RSS from 'rss'
import { serverQueryContent } from '#content/server'

export default defineEventHandler(async(event) => {
	const config = useRuntimeConfig()
	const feed = new RSS({
		title: 'Enzo Innocenzi',
		site_url: config.public.siteUrl,
		feed_url: `${config.public.siteUrl}/rss.xml`,
	})

	const docs = await serverQueryContent(event).sort({ date: -1 }).where({ _partial: false }).find()
	const articles = docs.filter((doc) => doc?._path?.includes('/articles'))

	for (const article of articles) {
		feed.item({
			title: article.title!,
			url: `${config.public.siteUrl}${article._path}`,
			date: article.created_at,
			description: article.description,
		})
	}

	const feedString = feed.xml({ indent: true })
	event.node.res.setHeader('content-type', 'text/xml')
	event.node.res.end(feedString)
})
