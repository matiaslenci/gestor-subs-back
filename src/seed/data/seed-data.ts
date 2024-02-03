interface SeedDefaultSub {
  name: string;
  logo?: string;
  slug?: string;
  colorId: number;
}

interface SeedColor {
  id: number;
  name: Colors;
}

type Colors =
  | 'rojo'
  | 'azul'
  | 'gris'
  | 'rosa'
  | 'verde'
  | 'morado'
  | 'amarillo'
  | 'naranja';

interface SeedData {
  defaultSub: SeedDefaultSub[];
  color: SeedColor[];
}

export const initialData: SeedData = {
  defaultSub: [
    {
      name: 'Netflix',
      colorId: 1,
    },
    {
      name: 'Disney +',
      colorId: 2,
    },
    {
      name: 'Spotify',
      colorId: 7,
    },
    {
      name: 'HBO Max',
      colorId: 4,
      logo: 'H',
    },
    {
      name: 'YouTube Premium',
      colorId: 1,
      logo: 'YT',
    },
    {
      name: 'Prime Video',
      colorId: 2,
    },
    {
      name: 'Paramount +',
      colorId: 2,
    },
    {
      name: 'Crunchyroll',
      colorId: 8,
    },
    {
      name: 'Twitch',
      colorId: 4,
    },
    {
      name: 'Apple TV+',
      colorId: 5,
      logo: 'A+',
      slug: 'apple-tv',
    },
    {
      name: 'YouTube Music',
      colorId: 1,
    },
    {
      name: 'Amazon Music',
      colorId: 5,
    },
    {
      name: 'Tidal',
      colorId: 2,
    },
    {
      name: 'Xbox Game Pass',
      colorId: 7,
      logo: 'XP',
    },
    {
      name: 'PlayStation Plus',
      colorId: 2,
      logo: 'PS',
    },
    {
      name: 'EA Play',
      colorId: 8,
      logo: 'EA',
    },
    {
      name: 'GitHub Copilot',
      colorId: 6,
      logo: 'G',
    },
    {
      name: 'Adobe Creative Cloud',
      colorId: 1,
      logo: 'AC',
    },
    {
      name: 'Canva',
      colorId: 2,
    },
    {
      name: 'Notion',
      colorId: 6,
    },
    {
      name: 'Google One',
      colorId: 8,
    },
    {
      name: 'iCloud',
      colorId: 2,
    },
    {
      name: 'Discord',
      colorId: 2,
      logo: 'DS',
    },
    {
      name: 'X (Twitter)',
      colorId: 2,
      logo: 'X',
      slug: 'x_twitter',
    },
    {
      name: 'Hulu',
      colorId: 7,
      logo: 'HU',
    },
    {
      name: 'ChatGPT Plus',
      colorId: 4,
      logo: 'C',
    },
  ],

  color: [
    { id: 1, name: 'rojo' },
    { id: 2, name: 'azul' },
    { id: 3, name: 'gris' },
    { id: 4, name: 'rosa' },
    { id: 5, name: 'verde' },
    { id: 6, name: 'morado' },
    { id: 7, name: 'amarillo' },
    { id: 8, name: 'naranja' },
  ],
};
