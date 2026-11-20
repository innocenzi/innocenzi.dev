export interface Hardware {
	name: string;
	url: string;
	specifications?: string;
	comment?: string;
}

export interface Software {
	name: string;
	url: string;
	description: string;
}

export const hardware: Hardware[] = [
	{ name: 'MacBook Pro 14"', url: 'https://www.apple.com/macbook-pro/', specifications: 'M1, 16GB RAM, 500GB', comment: 'my work machine' },
	{ name: 'Custom gaming PC', url: 'https://pcpartpicker.com/', specifications: 'Hyte Y60, Ryzen 7 7800X3D, 2x 980 Pro 2TB, RTX 4090 FE, 32GB' },
	{ name: 'NuPhy Gem80', url: 'https://nuphy.com/products/gem80', specifications: 'Mint switches, QWERTY international layout' },
	{
		name: 'G502X Lightspeed',
		url: 'https://www.logitechg.com/en-us/shop/p/g502-x-plus-wireless-lightforce.910-006160',
		comment: 'I would choose the MX Master if I did not need the extra buttons for gaming',
	},
	{
		name: 'Arctis Nova Pro',
		url: 'https://steelseries.com/gaming-headsets/arctis-nova-pro-wireless',
		comment: 'I love it because it is wireless and has two batteries',
	},
	{
		name: 'AV Access 8K KVM Switch',
		url: 'https://www.avaccess.com/products/8ksw21-kvm/',
		specifications: '8KSW21-KVM',
		comment: 'for switching between personal and work computers',
	},
	{ name: 'Shure MV7', url: 'https://www.shure.com/en-US/products/microphones/mv7', comment: 'On an Elgato Wave Mic Arm, using the XLR dock' },
	{
		name: 'Elgato Stream Deck+',
		url: 'https://www.elgato.com/us/en/p/stream-deck-plus-black',
		comment: 'I use it to control sound and lights using Home Assistant',
	},
	{ name: 'Elgato Facecam', url: 'https://www.elgato.com/us/en/p/facecam', specifications: '1080p60' },
	{
		name: 'AirPods Pro',
		url: 'https://www.apple.com/airpods-pro/',
		specifications: 'Second generation, USB-C',
		comment: 'bought these for the noise cancellation despite being on Android',
	},
	{ name: 'Pixel 8 Pro', url: 'https://store.google.com/category/phones', specifications: 'Black, 12GB' },
	{
		name: 'Dell G2724D',
		url: 'https://www.dell.com/en-us/shop/dell-27-gaming-monitor-g2724d/apd/210-bhxc/monitors-monitor-accessories',
		specifications: '2x 27" 2560x1440, 165Hz',
		comment: 'the secondary one is mounted vertically',
	},
	{
		name: 'Flexispot E7 Pro',
		url: 'https://www.flexispot.com/flexispot-best-standing-desk-e7pro',
		comment: 'I generally work standing, and lower it for gaming',
	},
	{
		name: 'Yeelight Monitor Light Bar Pro',
		url: 'https://store.yeelight.com/collections/monitor-light-bar/products/yeelight-pura-monitor-light-bar-pro',
		comment: 'Screen light bar for reducing eye strain, set up on Home Assistant',
	},
	{ name: 'Home Assistant Green', url: 'https://www.home-assistant.io/green', specifications: 'With ZBT-1', comment: 'my whole house is automated' },
];

export const software: Software[] = [
	{ name: 'Code', url: 'https://code.visualstudio.com', description: 'My primary editor, I use it for PHP, TypeScript and everything else' },
	{ name: 'Zed', url: 'https://zed.dev', description: 'My secondary editor, I use it sometimes and wait for it to mature' },
	{ name: 'Zen', url: 'https://zen-browser.app/', description: 'My main browser, I love the minimalism' },
	{ name: 'Ghostty', url: 'https://ghostty.org/', description: 'It’s lightweight and completely customizable' },
	{ name: 'Raycast', url: 'https://raycast.com', description: 'My favorite productivity software, both on macOS and Windows' },
	{ name: 'NearDrop', url: 'https://github.com/grishka/NearDrop', description: 'Installed on macOS to share files from my Android' },
	{ name: 'QuickShare', url: 'https://www.android.com/better-together/quick-share-app/', description: 'Installed on Windows to share files from my Android' },
	{ name: 'Fastmail', url: 'https://www.fastmail.com', description: 'I have multiple email addresses with different domains' },
	{ name: 'Yaak', url: 'https://yaak.app', description: 'Modern API client that I love for its minimalism' },
	{ name: '1Password', url: 'https://1password.com', description: 'Password manager for both work and my family' },
	{ name: 'TablePlus', url: 'https://tableplus.com', description: 'Works with Raycast, but I’m waiting for SQL Studio to release' },
	{ name: 'DBngin', url: 'https://dbngin.com', description: 'Database engine manager for local development' },
	{ name: 'Medis', url: 'https://getmedis.com', description: 'Redis GUI client for managing Redis databases' },
	{ name: 'Herd', url: 'https://herd.laravel.com', description: 'Local PHP development environment' },
	{ name: 'Ray', url: 'https://myray.app', description: 'Debugging interface for PHP' },
	{ name: 'Affinity', url: 'https://www.affinity.studio/', description: 'All-in-one design suite' },
	{ name: 'Proton VPN', url: 'https://protonvpn.com', description: 'I rarely use it but it’s one of the few good VPNs' },
	{ name: 'Linear', url: 'https://linear.app', description: 'We use Linear at work for project management' },
	{ name: 'Wave Link', url: 'https://www.elgato.com/us/en/s/downloads', description: 'Manages the sound of each application, both on macOS and Windows' },
	{ name: 'Netlify', url: 'https://netlify.com', description: 'All my static websites are hosted here' },
	{ name: 'Cloudflare', url: 'https://cloudflare.com', description: 'All my domains are registered here, and I use R2 a lot' },
	{ name: 'Hetzner', url: 'https://www.hetzner.com', description: 'Server hosting for everything that needs a server' },
];
