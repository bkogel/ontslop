// Typen voor regels.mjs, voor wie de regels vanuit TypeScript gebruikt.

export type Ernst = "hoog" | "midden" | "laag";
export type Groep = "tekst" | "taal" | "ontwerp";

export interface Vondst {
  id: string;
  groep: Groep;
  ernst: Ernst;
  naam: string;
  uitleg: string;
  fix: string;
  /** Regelnummer in de tekst of het bestand, vanaf 1. */
  regel: number;
  fragment: string;
}

export const VERSIE: string;
export const ERNST: Record<Ernst, number>;
export function isNederlands(tekst: string): boolean | null;
export function analyseerTekst(tekst: string, opties?: { markdown?: boolean }): Vondst[];
export function analyseerBestand(bron: string, extensie: string): Vondst[];
export function score(vondsten: Vondst[], tekst: string): number;
