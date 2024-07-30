import { DescriptionList } from '@/components/DataDisplay'
import { Loader } from '@googlemaps/js-api-loader'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import Modal from '@/components/Modal'
import AddRestaurantForm, { NewRestaurantFormInfo } from './AddRestaurantForm'
import { UseFormSetValue } from 'react-hook-form'
import { insertCity, insertNeighborhood } from '@/lib/clientQueries'

const loader = new Loader({
  apiKey: 'AIzaSyDZ8J-qxS-5IeglPQipirly92KykHNB9lQ',
  version: 'alpha',
  libraries: ['places', 'maps'],
})
const defaultMapOptions = {
  center: {
    lat: 40.762312,
    lng: -73.979345,
  },
  zoom: 11,
}

export async function reverseGeocode({
  lng,
  lat,
}: {
  lng: number
  lat: number
}) {
  const res = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=neighborhood,locality,place&language=en-US&access_token=pk.eyJ1Ijoicmlja29ubyIsImEiOiJjbHMwbmZ0ZzUwMnQ0Mm5zMWUza3pyOTFmIn0.uUSCkfeeFhk88UJilttOPg`,
  )
  const data = await res.json()
  console.log(data)
  return data
}

type Serves = {
  serves: {
    servesBeer: boolean
    servesBreakfast: boolean
    servesBrunch: boolean
    servesDinner: boolean
    servesLunch: boolean
    servesVegetarianFood: boolean
    servesWine: boolean
  }
}

function Serves({
  serves: {
    servesBreakfast,
    servesBeer,
    servesBrunch,
    servesDinner,
    servesLunch,
    servesVegetarianFood,
    servesWine,
  },
}: Serves) {
  return (
    <div className="flex gap-1 text-lg">
      {servesBreakfast && <Icon icon="ic:outline-breakfast-dining" />}
      {servesBrunch && <Icon icon="ic:outline-brunch-dining" />}
      {servesLunch && <Icon icon="ic:outline-lunch-dining" />}
      {servesDinner && <Icon icon="ic:outline-dinner-dining" />}
      {servesWine && <Icon icon="ic:round-wine-bar" />}
      {servesBeer && <Icon icon="ri:beer-fill" />}
      {servesVegetarianFood && <Icon icon="icon-park-outline:vegetables" />}
    </div>
  )
}

export default function GoogleMap({ setValue } : { setValue: UseFormSetValue<NewRestaurantFormInfo>}) {
  const googleMap = useRef(null)
  const autocompleteEl = useRef(null)
  const google = useRef(null)
  const [place, setPlace] = useState<any>()
  const [mapboxData, setMapboxData] = useState<any>()
  const [gMap, setMap] = useState<any>()

  useEffect(() => {
    loader.load().then((google) => {
      const map = new google.maps.Map(googleMap.current, defaultMapOptions)

      const autocomplete = new google.maps.places.PlaceAutocompleteElement()
      autocompleteEl.current = autocomplete
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(
        autocompleteEl.current,
      )
      const marker = new google.maps.Marker({ map })
      const geocoder = new google.maps.Geocoder()
      autocomplete.addEventListener(
        'gmp-placeselect',
        async ({ place }: { place: any }) => {
          await place.fetchFields({
            fields: [
              'displayName',
              'formattedAddress',
              'addressComponents',
              'location',
              'businessStatus',
              'types',
              'websiteURI',
              'nationalPhoneNumber',
              'internationalPhoneNumber',
              'openingHours',
              'googleMapsURI',
              'priceLevel',
              'servesBeer',
              'servesBreakfast',
              'servesBrunch',
              'servesDinner',
              'servesLunch',
              'servesVegetarianFood',
              'servesWine',
            ],
          })
          const placeJSON = place.toJSON()
          setPlace(placeJSON)

          if (place.viewport) {
            map.fitBounds(place.viewport)
          } else {
            map.setCenter(place.location)
            map.setZoom(17)
          }

          const { results } = await geocoder.geocode({ placeId: place.id })
          marker.setPlace({
            placeId: place.id,
            location: results[0].geometry.location,
          })
          console.log(placeJSON)
          const rawMapbox = await reverseGeocode(placeJSON.location)
          console.log(rawMapbox)
          const location: any[] = rawMapbox?.features
          const mapboxData: any = {}
          for (const loc of location) {
              const granularity = loc?.id.split('.')[0]
              mapboxData[`${granularity}Id`] = loc?.id
              mapboxData[granularity] = loc?.text
          }
          console.log(mapboxData)

          // Set form values
          setValue('name', placeJSON.displayName)
          setValue('maps', placeJSON.googleMapsURI)
          setValue('website', placeJSON.websiteURI)

          console.log(mapboxData)
          const neighborhood = mapboxData.neighborhood || mapboxData.locality
          const neighborhoodId = mapboxData.neighborhoodId || mapboxData.localityId
          await insertCity(mapboxData.placeId, mapboxData.place)
          if (neighborhood && neighborhoodId) {
            insertNeighborhood(neighborhoodId, mapboxData.placeId, mapboxData.neighborhood)
          }


          setValue('neighborhood', neighborhoodId)
          setValue('city', mapboxData.placeId)
          setMapboxData(mapboxData)
        },
      )

      google.current = google
      setMap(map)
    })
  }, [setValue])

  return (
    <div>
      <div ref={googleMap} className="h-96 w-full">
        <div
          dangerouslySetInnerHTML={{ __html: autocompleteEl.current ?? '' }}
        ></div>
      </div>
      {place && (
        <div className="mt-6">
          <DescriptionList
            title={place.displayName}
            accentText={place.formattedAddress}
            description=""
            action={{ text: 'Add this restaurant', onClick: () => {} }}
            stats={[
              {
                label: 'Google Maps link',
                value: place.googleMapsURI,
                type: 'link',
              },
              {
                label: 'Phone number',
                value: place.nationalPhoneNumber,
                type: 'phone',
              },
              { label: 'Website', value: place.websiteURI ?? '', type: 'link' },
              {
                label: 'Coordinates',
                value: `${place.location.lng}, ${place.location.lat}`,
              },
              { label: 'Neighborhood', value: mapboxData?.neighborhood },
              {
                label: 'Serves',
                value: '',
                render: <Serves serves={place} />,
              },
            ]}
          />
        </div>
      )}
    </div>
  )
}
