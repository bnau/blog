import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { AUTHOR, ORGANIZATION, SITE_URL } from '../consts';
import {
	generatePersonSchema,
	generateOrganizationSchema,
	generateCourseSchema,
	stripHtml,
} from '../utils/structured-data';

/**
 * Generate a comprehensive JSON-LD graph for AI agents
 * This endpoint provides a machine-readable catalog of all training offerings
 * optimized for discovery by AI assistants and search agents
 */
export const GET: APIRoute = async () => {
	// Fetch all formations
	const formations = (await getCollection('formations')).sort(
		(a, b) => a.data.order - b.data.order
	);

	// Generate schemas
	const personSchema = generatePersonSchema(AUTHOR);
	const orgSchema = generateOrganizationSchema(ORGANIZATION);

	// Build organization with instructor reference
	const educationalOrg = {
		'@type': 'EducationalOrganization',
		'@id': `${SITE_URL}/#organization`,
		...orgSchema,
		instructor: {
			'@id': `${SITE_URL}/about#person`,
		},
	};

	// Build person schema with full ID
	const fullPersonSchema = {
		...personSchema,
		'@id': `${SITE_URL}/about#person`,
	};

	// Build course list
	const courseList = {
		'@type': 'ItemList',
		name: 'Formations en Agentic Coding et IA pour développeurs',
		description:
			'Catalogue complet des formations spécialisées en développement assisté par IA : Claude Code, Model Context Protocol (MCP), agentic coding, et outils IA pour développeurs',
		url: `${SITE_URL}/formations`,
		numberOfItems: formations.length,
		itemListElement: formations.map((formation, index) => {
			const courseSchema = generateCourseSchema(formation, fullPersonSchema, SITE_URL);
			return {
				'@type': 'ListItem',
				position: index + 1,
				item: {
					...courseSchema,
					provider: {
						'@id': `${SITE_URL}/#organization`,
					},
					instructor: {
						'@id': `${SITE_URL}/about#person`,
					},
				},
			};
		}),
	};

	// Build FAQ from formations
	const faqItems = [
		{
			'@type': 'Question',
			name: 'Quelles formations proposez-vous en agentic coding ?',
			acceptedAnswer: {
				'@type': 'Answer',
				text: `Je propose ${formations.length} formation${formations.length > 1 ? 's' : ''} principales : ${formations.map((f) => `'${f.data.title}' (${f.data.duration} jour${f.data.duration > 1 ? 's' : ''}, ${f.data.price}€ HT)`).join(', ')}.`,
			},
		},
		{
			'@type': 'Question',
			name: 'Qui peut suivre ces formations sur l\'IA pour développeurs ?',
			acceptedAnswer: {
				'@type': 'Answer',
				text: 'Mes formations s\'adressent aux développeurs, tech leads et architectes logiciels qui souhaitent maîtriser les outils d\'IA générative pour améliorer leur productivité et créer des applications intelligentes.',
			},
		},
		{
			'@type': 'Question',
			name: 'Comment apprendre Claude Code et le Model Context Protocol ?',
			acceptedAnswer: {
				'@type': 'Answer',
				text: `La formation '${formations[0]?.data.title}' vous apprend à utiliser Claude Code et à comprendre le Model Context Protocol (MCP). ${formations.length > 1 ? `Pour aller plus loin, la formation '${formations[1]?.data.title}' vous permet de maîtriser l'architecture MCP et de développer des intégrations personnalisées.` : ''}`,
			},
		},
		{
			'@type': 'Question',
			name: 'Quel est le tarif des formations en agentic coding ?',
			acceptedAnswer: {
				'@type': 'Answer',
				text: formations
					.map(
						(f) =>
							`La formation '${f.data.title}' est à ${f.data.price}€ HT par personne pour ${f.data.duration} jour${f.data.duration > 1 ? 's' : ''}.`
					)
					.join(' ') + ' Les formations peuvent être dispensées en ligne ou sur site.',
			},
		},
		{
			'@type': 'Question',
			name: 'Comment contacter Bertrand Nau pour une formation ?',
			acceptedAnswer: {
				'@type': 'Answer',
				text: `Vous pouvez me contacter par email à ${AUTHOR.email} ou consulter mes profils sur GitHub, LinkedIn ou Bluesky pour discuter de vos besoins en formation.`,
			},
		},
	];

	// Add dynamic questions from each formation
	formations.forEach((formation) => {
		faqItems.push({
			'@type': 'Question',
			name: `Que vais-je apprendre dans la formation "${formation.data.title}" ?`,
			acceptedAnswer: {
				'@type': 'Answer',
				text: `Cette formation de ${formation.data.duration} jour${formation.data.duration > 1 ? 's' : ''} vous permet de : ${formation.data.objectives.join(', ')}.`,
			},
		});
	});

	const faqPage = {
		'@type': 'FAQPage',
		mainEntity: faqItems,
	};

	// Build the complete graph
	const jsonLdGraph = {
		'@context': 'https://schema.org',
		'@graph': [educationalOrg, fullPersonSchema, courseList, faqPage],
	};

	return new Response(JSON.stringify(jsonLdGraph, null, 2), {
		status: 200,
		headers: {
			'Content-Type': 'application/ld+json',
			'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
		},
	});
};
