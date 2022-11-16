import { SitemapStream, streamToPromise } from 'sitemap'
import { serverQueryContent } from '#content/server'

export default defineEventHandler(async(event) => {
	const docs = await serverQueryContent(event).find()
	const sitemap = new SitemapStream({
		hostname: 'https://innocenzi.dev',
	})

	sitemap.write({
		url: '/',
		changefreq: 'monthly',
	})

	sitemap.write({
		url: '/articles',
		changefreq: 'daily',
	})

	for (const doc of docs) {
		sitemap.write({
			url: doc._path,
			changefreq: 'monthly',
			lastmod: doc.updated_at ?? doc.created_at,
		})
	}
	sitemap.end()

	return streamToPromise(sitemap)
})
