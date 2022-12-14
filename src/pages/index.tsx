// Next JS
import type { NextPage } from 'next'
import Head from 'next/head'

// React import
import { useState, useEffect } from "react"

// Dependencies import
import axios from 'axios'

// types import
import { Location } from '@Types/types'

// Consts import
import { GOECODING_URI, PLACES_URI } from '@Const/api-uri'

// API import
import { fetchPlaces, fetchGeocoding } from '@API/places'
import Place from '@Components/place'


const Home: NextPage = () => {

  const [locationString, setLocationString] = useState<string>("")
  const [locations, setLocations] = useState<string[]>([])
  const [selectedTab, setSelectedTab] = useState<number>(0)
  const [places, setPlaces] = useState<any[]>([])


  let debounce: NodeJS.Timeout;

  // seperating the locations based on the commas
  useEffect(() => {
    if (locationString.length === 0) return setLocations([])
    setLocations(locationString.split(","))

  }, [locationString])


  return (
    <div className='py-[3rem] px-[2rem]  flex flex-col items-center w-screen min-h-screen'>
      <Head>
        <title>Discover Places</title>
      </Head>
      <span className='font-bold text-[2.5rem] mb-6'>Discover Places</span>

      <div className='flex items-end gap-x-4 w-full justify-center mb-6'>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Where?</span>
            <span className="label-text-alt">Seperate with commas</span>
          </label>
          <input type="text" placeholder="Type locations" className="input input-bordered w-full max-w-xs" onChange={(e) => {
            clearTimeout(debounce)
            debounce = setTimeout(() => {
              setLocationString(e.target.value)
            }, 500)
          }} />

        </div>

        <div className="tooltip" data-tip="Click to search for places">
          <button

            disabled={locations.length === 0}
            onClick={async () => {
              if (locations.length === 0) return
              const coordinates = await fetchGeocoding(locations)
              console.log("Function coordinates : ", coordinates)
              const returnedPlaces = await fetchPlaces(coordinates)
              setPlaces(returnedPlaces)
              console.log("Function places : ", returnedPlaces)
            }} className='btn'>Search</button>
        </div>


      </div>

      {
        locations.length > 0 && places.length > 0 && 
        <div className="tabs">
          {locations.map((location, index) => {
            return <a key={location} onClick={() => setSelectedTab(index)} className={`tab tab-lifted ${index === selectedTab && "tab-active"}`}>{location}</a>
          })}
        </div>
      }


      <div className='grid gap-4 grid-cols-3 grid-rows-3'>
        {
          places[selectedTab] && places[selectedTab]?.features?.map((place : any, index: number) => {
            return <Place key={index} place={place.properties} />
          })
        }
      </div>

    </div>
  )
}

export default Home
