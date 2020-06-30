// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function(api) {
	api.loadSource(async (actions) => {
		const technologies = require('./content/technologies.json');

		const collection = actions.addCollection({
			typeName: 'Technology',
		});

		for (const technology of Object.values(technologies)) {
			collection.addNode(technology);
		}
	});

	api.createPages(({ createPage }) => {
		// Use the Pages API here: https://gridsome.org/docs/pages-api/
	});
};
