export default function RestaurantSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Trattoria Da Simonetta',
    image: 'https://www.dasimonetta.it/og-image.jpg',
    url: 'https://www.dasimonetta.it',
    telephone: '+390670491589',
    priceRange: '€€',
    servesCuisine: ['Cucina Romana', 'Pizza'],
    hasMenu: 'https://www.dasimonetta.it/it/menu',
    acceptsReservations: false,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Via Pontremoli 30',
      addressLocality: 'Roma',
      postalCode: '00182',
      addressCountry: 'IT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      // ⚠️ Aggiorna con le coordinate GPS esatte da Google Maps
      latitude: 41.884910480653836,
      longitude: 12.51190120046054
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday'],
        opens: '12:00',
        closes: '15:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '12:00',
        closes: '15:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '19:00',
        closes: '23:00',
      },
    ],
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Outdoor seating', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Wi-Fi',           value: true },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
