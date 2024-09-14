'use client'

import { useState, useEffect, useRef } from 'react'
import mapboxgl, { Map as MapType } from 'mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import { DescriptionList } from '@/components/DataDisplay'

mapboxgl.accessToken =
  'pk.eyJ1Ijoicmlja29ubyIsImEiOiJjbHMwbmZ0ZzUwMnQ0Mm5zMWUza3pyOTFmIn0.uUSCkfeeFhk88UJilttOPg'

type PlaceResult = {
  name: string
  location: Partial<{
    neighborhood: string
    locality: string
    place: string
    district: string
    region: string
    country: string
  }>
  category?: string[]
  wikidata?: string
  foursquare?: string
  coordinates: [number, number]
}

function parseResult(result: any): PlaceResult {
  const context: { id: string; text: string }[] = result['context'].map(
    (i: any) => ({ id: i.id, text: i.text }),
  )
  const location: PlaceResult['location'] = {}
  for (const { id, text } of context) {
    const property = id.split('.')[0] as keyof PlaceResult['location']
    location[property] = text
  }
  return {
    name: result['text'],
    location,
    category: result['properties']['category'].split(', '),
    wikidata: result['properties']['wikidata'],
    foursquare: result['properties']['foursquare'],
    coordinates: result['center'],
  }
}

function ViewResult({
  result,
  wikiData,
}: {
  result?: PlaceResult
  wikiData?: any
}) {
  if (!result) return null
  const stats = [
    { label: 'Coordinates', value: result.coordinates.join(', ') },
    { label: 'Neighborhood', value: result.location.neighborhood ?? '--' },
    { label: 'Locality', value: result.location.locality ?? '--' },
    { label: 'Place', value: result.location.place ?? '--' },
    { label: 'District', value: result.location.district ?? '--' },
    { label: 'Region', value: result.location.region ?? '--' },
    { label: 'Country', value: result.location.country ?? '--' },
    { label: 'Category', value: result.category?.join(', ') ?? '--' },
    { label: 'Wikidata', value: result.wikidata ?? '' },
    { label: 'FourSquare', value: result.foursquare ?? '' },
  ]
  const wikiStats = wikiData
    ? [
        { label: 'Chefs', value: wikiData.chefs?.join(', ') ?? '' },
        { label: 'Awards', value: wikiData.awardIds?.join(', ') ?? '' },
        { label: 'Cuisines', value: wikiData.cuisines?.join(', ') ?? '' },
        { label: 'Website', value: wikiData.websites?.join(', ') ?? '' },
        {
          label: 'Michelin',
          value: wikiData.michelin?.amount?.join(', ') ?? '',
        },
        { label: 'Michelin guide', value: wikiData.michelin?.site ?? '' },
      ]
    : []
  return (
    <div>
      <DescriptionList
        title={result.name}
        accentText="Mapbox data"
        description=""
        stats={stats}
      />
      {wikiData && (
        <DescriptionList
          title={wikiData.name}
          accentText="WikiData"
          description=""
          stats={wikiStats}
        />
      )}
    </div>
  )
}

async function parseWikiDataRestaurantJson(json: any) {
  const awards = json['statements']?.['P166']
  const awardIds = awards?.map((award: any) => award['value']['content'])
  const result: any = {
    name: json['labels']['en'],
    awardIds: awardIds,
  }

  // Check for awards
  console.log('Checking awards')
  result['michelin'] = {
    amount: [],
  }
  for (const award of awards) {
    // If michelin award
    if (award['value']['content'] === 'Q20824563') {
      console.log('found michelin')
      for (const qualifier of award['qualifiers']) {
        const qualifierId = qualifier['property']['id']
        if (qualifierId === 'P1114') {
          const stars = qualifier['value']['content']['amount']
          result['michelin']['amount'] = [
            ...result['michelin']['amount'],
            +stars,
          ]
        }
      }
      for (const reference of award['references']) {
        const parts = reference['parts']
        for (const part of parts) {
          const site = part['value']['content']
          if (typeof site === 'string' && site.includes('michelin')) {
            result['michelin']['site'] = site
          }
        }
      }
    }
  }

  // Get site
  console.log('Getting website')
  const sites = json['statements']?.['P856']?.map(
    (site: any) => site['value']['content'],
  )
  result['websites'] = sites

  console.log('Getting cuisines')
  const cuisineIds =
    json['statements']?.['P2012']?.map(
      (cuisine: any) => cuisine['value']['content'],
    ) || []
  const cuisines = await Promise.all(
    cuisineIds.map(async (cuisineId: string) => {
      const res = await fetch(
        `https://www.wikidata.org/w/rest.php/wikibase/v0/entities/items/${cuisineId}`,
      )
      const data: any = await res.json()
      return data['labels']['en']
    }),
  )
  result['cuisines'] = cuisines

  console.log('Getting directors')
  const chefIds =
    json['statements']?.['P1037']?.map(
      (chef: any) => chef['value']['content'],
    ) || []
  const chefs = await Promise.all(
    chefIds.map(async (chefId: string) => {
      const res = await fetch(
        `https://www.wikidata.org/w/rest.php/wikibase/v0/entities/items/${chefId}`,
      )
      const data: any = await res.json()
      return data['labels']['en']
    }),
  )
  result['chefs'] = chefs

  console.log(result)
  return result
}

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<MapType | null>(null)
  const [lng, setLng] = useState(-70.9)
  const [lat, setLat] = useState(42.35)
  const [zoom, setZoom] = useState(9)
  const [result, setResult] = useState<PlaceResult>()
  const [wikiData, setWikiData] = useState<any>()

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current ?? '',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    })
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: undefined,
    })
    geocoder.on('result', async ({ result }) => {
      const parsed = parseResult(result)
      setResult(parsed)
      if (!parsed.wikidata) {
        setWikiData(undefined)
        return
      }
      const wikiJson = await fetch(
        `https://www.wikidata.org/w/rest.php/wikibase/v0/entities/items/${parsed.wikidata}`,
      )
      const data = await wikiJson.json()
      setWikiData(await parseWikiDataRestaurantJson(data))
    })
    map.current?.addControl(geocoder)
  })

  map.current?.on('move', () => {
    setLng(Number(map.current?.getCenter().lng.toFixed(4)) || -70.9)
    setLat(Number(map.current?.getCenter().lat.toFixed(4)) || 42.35)
    setZoom(Number(map.current?.getZoom().toFixed(2)) || 9)
  })

  return (
    <div>
      <div ref={mapContainer} className="h-96" />
      <ViewResult result={result} wikiData={wikiData} />
    </div>
  )
}
