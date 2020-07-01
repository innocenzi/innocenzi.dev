// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function(api) {
	const addJsonSource = (path, typeName) => {
		api.loadSource(async (actions) => {
			const data = require(path);
			const collection = actions.addCollection({ typeName });
			Object.entries(data).forEach(([id, item]) => collection.addNode({ id, ...item }));
		});
	};

	addJsonSource('./content/technologies.json', 'Technology');
	addJsonSource('./content/links.json', 'Link');
};
