export const PLACES_URI = (lon: string, lat: string) =>
  `https://api.geoapify.com/v2/places?categories=commercial,catering,entertainment,leisure,activity,natural&filter=circle:${lon},${lat},500&limit=20&apiKey=${process.env.NEXT_PUBLIC_PLACES_KEY}`;

export const GOECODING_URI = (location: string) =>
  `https://api.geoapify.com/v1/geocode/search?text=${location}&apiKey=${process.env.NEXT_PUBLIC_PLACES_KEY}`;
