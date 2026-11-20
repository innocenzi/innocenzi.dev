import en from './en.json';

// The site is English only. A second locale would add its JSON file here and in astro.config.ts.
export const locale = 'en';

export const t = en;

export function format(template: string, values: Record<string, string | number>): string {
	return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}

export function plural(forms: { one: string; other: string }, count: number): string {
	return new Intl.PluralRules(locale).select(count) === 'one' ? forms.one : forms.other;
}

// Splits a template around its placeholders, so each placeholder can be rendered as markup, such as a link.
export function formatParts(template: string): Array<{ text: string } | { key: string }> {
	return template
		.split(/(\{\w+\})/)
		.filter(Boolean)
		.map((part) => (/^\{\w+\}$/.test(part) ? { key: part.slice(1, -1) } : { text: part }));
}

const dateStyles = {
	long: { year: 'numeric', month: 'long', day: 'numeric' },
	short: { year: 'numeric', month: 'short', day: 'numeric' },
	day: { month: 'short', day: 'numeric' },
} satisfies Record<string, Intl.DateTimeFormatOptions>;

export function formatDate(date: Date, style: keyof typeof dateStyles = 'long'): string {
	return new Intl.DateTimeFormat(locale, { ...dateStyles[style], timeZone: 'UTC' }).format(date);
}

// For `datetime` attributes, as in `2026-01-19`.
export function isoDate(date: Date): string {
	return date.toISOString().slice(0, 10);
}

export function documentTitle(page: string): string {
	return format(t.document_title, { page });
}
