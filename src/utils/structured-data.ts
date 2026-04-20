import type { CollectionEntry } from 'astro:content';

// ============================================================================
// Type Definitions (schema.org)
// ============================================================================

export interface Person {
	'@type': 'Person';
	'@id'?: string;
	name: string;
	jobTitle?: string;
	description?: string;
	url?: string;
	image?: string;
	email?: string;
	sameAs?: string[];
	knowsAbout?: string[];
}

export interface Organization {
	'@type': 'Organization';
	name: string;
	legalName?: string;
	description?: string;
	url?: string;
	logo?: string;
	email?: string;
	foundingDate?: string;
	areaServed?: string;
	knowsLanguage?: string[];
}

export interface Course {
	'@context': 'https://schema.org';
	'@type': 'Course';
	'@id': string;
	name: string;
	description: string;
	provider: Person | Organization;
	instructor?: Person;
	courseCode?: string;
	educationalLevel?: string;
	teaches?: string[];
	keywords?: string[];
	inLanguage: string;
	timeRequired?: string;
	audience?: {
		'@type': 'Audience';
		audienceType: string;
	};
	offers: {
		'@type': 'Offer';
		price: string;
		priceCurrency: string;
		availability: string;
		url: string;
	};
	hasCourseInstance?: {
		'@type': 'CourseInstance';
		courseMode: string[];
		instructor?: { '@id': string };
	};
}

export interface BlogPosting {
	'@context': 'https://schema.org';
	'@type': 'BlogPosting' | 'TechArticle';
	'@id': string;
	headline: string;
	description: string;
	author: Person;
	publisher: Person | Organization;
	datePublished: string;
	dateModified: string;
	image?: string;
	keywords?: string[];
	inLanguage: string;
	url: string;
	mainEntityOfPage?: {
		'@type': 'WebPage';
		'@id': string;
	};
}

export interface BreadcrumbList {
	'@context': 'https://schema.org';
	'@type': 'BreadcrumbList';
	itemListElement: Array<{
		'@type': 'ListItem';
		position: number;
		name: string;
		item?: string;
	}>;
}

export interface ItemList {
	'@context': 'https://schema.org';
	'@type': 'ItemList';
	name?: string;
	description?: string;
	numberOfItems: number;
	itemListElement: Array<{
		'@type': 'ListItem';
		position: number;
		item: Course | {
			'@type': 'Course';
			name: string;
			url: string;
			description: string;
			offers?: {
				'@type': 'Offer';
				price: string;
				priceCurrency: string;
			};
		};
	}>;
}

export interface WebSite {
	'@context': 'https://schema.org';
	'@type': 'WebSite';
	'@id': string;
	name: string;
	description?: string;
	url: string;
	inLanguage?: string;
	potentialAction?: {
		'@type': 'SearchAction';
		target: {
			'@type': 'EntryPoint';
			urlTemplate: string;
		};
		'query-input': string;
	};
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Extract keywords automatically from text content
 */
export function extractKeywords(text: string): string[] {
	const keywords: string[] = [];
	const content = text.toLowerCase();

	// Primary keywords
	if (content.includes('agentic coding') || content.includes('agentic')) {
		keywords.push('agentic coding');
	}
	if (content.includes('claude code')) {
		keywords.push('Claude Code');
	}
	if (content.includes('mcp') || content.includes('model context protocol')) {
		keywords.push('Model Context Protocol', 'MCP');
	}
	if (content.includes('prompt engineering') || content.includes('prompting')) {
		keywords.push('prompt engineering');
	}
	if (content.includes('rag') || content.includes('retrieval')) {
		keywords.push('RAG', 'Retrieval-Augmented Generation');
	}
	if (content.includes('function calling')) {
		keywords.push('function calling');
	}
	if (content.includes('spec kit')) {
		keywords.push('Spec Kit');
	}
	if (content.includes('llm') || content.includes('large language model')) {
		keywords.push('LLM', 'Large Language Models');
	}
	if (content.includes('agent')) {
		keywords.push('autonomous agents', 'coding agents');
	}
	if (content.includes('ia générative') || content.includes('generative ai')) {
		keywords.push('IA générative', 'generative AI');
	}
	if (content.includes('anthropic')) {
		keywords.push('Anthropic', 'Claude API');
	}

	// Remove duplicates
	return [...new Set(keywords)];
}

/**
 * Generate course code from formation slug
 */
export function generateCourseCode(slug: string): string {
	if (slug.includes('intro')) return 'AC101';
	if (slug.includes('agentic-coding')) return 'AC201';
	return 'AC100';
}

/**
 * Determine educational level from formation content
 */
export function determineEducationalLevel(
	formation: CollectionEntry<'formations'>
): 'Beginner' | 'Intermediate' | 'Advanced' {
	const title = formation.data.title.toLowerCase();
	const summary = formation.data.summary.toLowerCase();

	if (title.includes('introduction') || title.includes('initiation')) {
		return 'Beginner';
	}
	if (title.includes('avancé') || title.includes('advanced')) {
		return 'Advanced';
	}
	return 'Intermediate';
}

/**
 * Convert duration to ISO 8601 format
 */
export function durationToISO8601(duration: number): string {
	return `P${duration}D`;
}

/**
 * Strip HTML tags from string
 */
export function stripHtml(html: string): string {
	return html.replace(/<[^>]*>/g, '').trim();
}

// ============================================================================
// Schema Generators
// ============================================================================

/**
 * Generate Person schema
 */
export function generatePersonSchema(profile: {
	name: string;
	jobTitle?: string;
	description?: string;
	url?: string;
	image?: string;
	email?: string;
	sameAs?: string[];
	knowsAbout?: string[];
}): Person {
	return {
		'@type': 'Person',
		'@id': profile.url ? `${profile.url}#person` : undefined,
		name: profile.name,
		jobTitle: profile.jobTitle,
		description: profile.description,
		url: profile.url,
		image: profile.image,
		email: profile.email,
		sameAs: profile.sameAs,
		knowsAbout: profile.knowsAbout,
	};
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema(org: {
	name: string;
	legalName?: string;
	description?: string;
	url?: string;
	logo?: string;
	email?: string;
	foundingDate?: string;
	areaServed?: string;
	knowsLanguage?: string[];
}): Organization {
	return {
		'@type': 'Organization',
		name: org.name,
		legalName: org.legalName,
		description: org.description,
		url: org.url,
		logo: org.logo,
		email: org.email,
		foundingDate: org.foundingDate,
		areaServed: org.areaServed,
		knowsLanguage: org.knowsLanguage,
	};
}

/**
 * Generate Course schema from formation
 */
export function generateCourseSchema(
	formation: CollectionEntry<'formations'>,
	author: Person,
	siteUrl: string
): Course {
	const { data, id } = formation;
	const url = `${siteUrl}/formations/${id}`;

	// Extract or generate keywords
	const textContent = `${data.title} ${data.summary} ${data.objectives.join(' ')}`;
	const keywords = data.keywords || extractKeywords(textContent);

	// Use teaches if provided, otherwise use objectives
	const teaches = data.teaches || data.objectives;

	// Generate course code
	const courseCode = data.courseCode || generateCourseCode(id);

	// Determine level
	const level = data.level || determineEducationalLevel(formation);

	return {
		'@context': 'https://schema.org',
		'@type': 'Course',
		'@id': url,
		name: data.title,
		description: stripHtml(data.summary),
		provider: author,
		instructor: author,
		courseCode,
		educationalLevel: level,
		teaches,
		keywords,
		inLanguage: data.language || 'fr',
		timeRequired: durationToISO8601(data.duration),
		audience: {
			'@type': 'Audience',
			audienceType: data.targetAudience,
		},
		offers: {
			'@type': 'Offer',
			price: data.price.toString(),
			priceCurrency: 'EUR',
			availability: 'https://schema.org/InStock',
			url,
		},
		hasCourseInstance: {
			'@type': 'CourseInstance',
			courseMode: ['online', 'onsite'],
			instructor: { '@id': author['@id'] || '#instructor' },
		},
	};
}

/**
 * Generate BlogPosting schema from blog post
 */
export function generateBlogPostingSchema(
	post: CollectionEntry<'blog'>,
	author: Person,
	siteUrl: string
): BlogPosting {
	const { data, id } = post;
	const url = `${siteUrl}/blog/${id}`;

	// Extract keywords if not provided
	const textContent = `${data.title} ${data.description}`;
	const keywords = data.keywords || extractKeywords(textContent);

	// Determine type (BlogPosting vs TechArticle)
	const isTechnical = keywords.some((k) =>
		['Claude Code', 'MCP', 'function calling', 'RAG'].includes(k)
	);

	return {
		'@context': 'https://schema.org',
		'@type': isTechnical ? 'TechArticle' : 'BlogPosting',
		'@id': url,
		headline: data.title,
		description: data.description,
		author,
		publisher: author,
		datePublished: data.pubDate.toISOString(),
		dateModified: (data.updatedDate || data.pubDate).toISOString(),
		image: data.cover?.src ? `${siteUrl}${data.cover.src}` : undefined,
		keywords,
		inLanguage: data.language || 'fr',
		url,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': url,
		},
	};
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbList(
	items: Array<{ name: string; url?: string }>
): BreadcrumbList {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.url,
		})),
	};
}

/**
 * Generate ItemList schema for formations catalog
 */
export function generateCourseListSchema(
	formations: CollectionEntry<'formations'>[],
	siteUrl: string
): ItemList {
	return {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: 'Formations en Agentic Coding',
		description:
			'Catalogue de formations spécialisées en développement assisté par IA, Claude Code, et Model Context Protocol (MCP)',
		numberOfItems: formations.length,
		itemListElement: formations.map((formation, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			item: {
				'@type': 'Course',
				name: formation.data.title,
				url: `${siteUrl}/formations/${formation.id}`,
				description: stripHtml(formation.data.summary),
				offers: {
					'@type': 'Offer',
					price: formation.data.price.toString(),
					priceCurrency: 'EUR',
				},
			},
		})),
	};
}

/**
 * Generate WebSite schema
 */
export function generateWebSiteSchema(site: {
	name: string;
	description?: string;
	url: string;
	inLanguage?: string;
}): WebSite {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': `${site.url}#website`,
		name: site.name,
		description: site.description,
		url: site.url,
		inLanguage: site.inLanguage || 'fr',
	};
}

// ============================================================================
// Serialization
// ============================================================================

/**
 * Serialize JSON-LD for HTML injection (minified)
 */
export function serializeJsonLd(schema: object): string {
	return JSON.stringify(schema);
}
