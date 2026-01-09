import type { CollectionEntry } from 'astro:content';

/**
 * Get the most recent conference date from a talk's conferences array
 */
export function getLastConferenceDate(talk: CollectionEntry<'talks'>): Date {
	return talk.data.conferences.reduce(
		(latest, conf) => (conf.date > latest ? conf.date : latest),
		talk.data.conferences[0].date
	);
}

/**
 * Get the most recent conference object from a talk's conferences array
 */
export function getLastConferenceWithReplay(talk: CollectionEntry<'talks'>): { name: string, date: Date, replayLink?: string } {
	const withReplay = talk.data.conferences.filter(conf => conf.replayLink)
	if (withReplay.length > 0) {
		return withReplay.reduce((latest, conf) => (conf.date > latest.date ? conf : latest))
	}
	return talk.data.conferences.reduce((latest, conf) => (conf.date > latest.date ? conf : latest))
}