export const SITE_TITLE = 'Bertrand Nau';
export const SITE_DESCRIPTION =
	'Formations et conseil en IA pour développeurs : agentic coding, Claude Code, Model Context Protocol (MCP), développement assisté par IA. Articles techniques et formations par Bertrand Nau.';
export const SITE_URL = 'https://bertrand-nau.fr';

export const SOCIAL_PROFILES = {
	email: 'contact@bertrand-nau.fr',
	github: 'bnau',
	linkedin: 'bertrand-nau',
	bluesky: 'bertrandnau.bsky.social',
};

// Author/Organization identity for structured data (AEO)
export const AUTHOR = {
	name: 'Bertrand Nau',
	jobTitle: 'Ingénieur logiciel expert en IA pour développeurs',
	description:
		'Expert en agentic coding, Claude Code et développement assisté par IA. Formation et conseil pour développeurs souhaitant maîtriser les outils IA modernes.',
	email: SOCIAL_PROFILES.email,
	url: `${SITE_URL}/about`,
	image: `${SITE_URL}/profile.jpeg`,
	sameAs: [
		`https://github.com/${SOCIAL_PROFILES.github}`,
		`https://linkedin.com/in/${SOCIAL_PROFILES.linkedin}`,
		`https://bsky.app/profile/${SOCIAL_PROFILES.bluesky}`,
	] as string[],
	knowsAbout: [
		'Agentic Coding',
		'Claude Code',
		'Model Context Protocol (MCP)',
		'AI-Assisted Development',
		'Large Language Models',
		'Prompt Engineering',
		'Function Calling',
		'Retrieval-Augmented Generation (RAG)',
		'Software Engineering',
		'Developer Training',
		'Spec Kit',
		'AI Development Tools',
		'Autonomous Coding Agents',
	] as string[],
};

export const ORGANIZATION = {
	name: 'Bertrand Nau - Formation & Conseil',
	legalName: 'Bertrand Nau',
	description:
		'Formation spécialisée en agentic coding et développement assisté par IA',
	url: SITE_URL,
	logo: `${SITE_URL}/profile.jpeg`,
	email: SOCIAL_PROFILES.email,
	areaServed: 'FR',
	knowsLanguage: ['fr', 'en'] as string[],
};

// AI-targeted keywords for meta tags and content optimization
export const AEO_KEYWORDS = {
	primary: [
		'agentic coding',
		'Claude Code',
		'Model Context Protocol',
		'MCP',
		'AI-assisted development',
		'AI coding agents',
	],
	secondary: [
		'LLM development',
		'prompt engineering',
		'function calling',
		'RAG implementation',
		'Spec Kit',
		'AI pair programming',
		'autonomous coding agents',
		'generative AI for developers',
	],
	technologies: [
		'Claude API',
		'Anthropic',
		'OpenAI',
		'Cursor IDE',
		'Windsurf IDE',
	],
} as const;

// Navigation configuration - control visibility of menu items
export const NAV_CONFIG = {
	veille: {
		enabled: false, // Set to false to hide the Veille navigation link
	},
} as const;
