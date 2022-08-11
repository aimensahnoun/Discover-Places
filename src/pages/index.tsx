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
import { GOECODING_URI } from '@Const/api-uri'


const Home: NextPage = () => {

  const [locationString, setLocationString] = useState<string>("")
  const [locations, setLocations] = useState<string[]>([])
  const [coordinates, setCoordinates] = useState<Location[]>([])

  let debouncer: NodeJS.Timeout;


  // seperating the locations based on the commas
  useEffect(() => {
    if (locationString.length === 0) return setLocations([])
    setLocations(locationString.split(","))

  }, [locationString])

// Goecoding the locations entered by users
  useEffect(() => {
    try {
      (async () => {
        if (locations.length === 0) return setCoordinates([])

        let newCoordinates: Location[] = []

        locations.forEach(async (location: string) => {
          const result = await axios.get(GOECODING_URI(location))
          const lat = result.data.features[0]?.properties?.lat
          const lon = result.data.features[0]?.properties?.lon
          newCoordinates.push({ lat, lon })
        })

        setCoordinates(newCoordinates)

      })()
    } catch (e) {
      console.log(e)
    }




  }, [locations])

  return (
    <div className='py-[3rem] px-[2rem]  flex flex-col items-center w-screen h-screen'>
      <Head>
        <title>Discover Places</title>
      </Head>
      <span className='font-bold text-[2.5rem] mb-6'>Discover Places</span>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Where?</span>
          <span className="label-text-alt">Seperate with commas</span>
        </label>
        <input type="text" placeholder="Type locations" className="input input-bordered w-full max-w-xs" onChange={(e) => {
          clearTimeout(debouncer)

          debouncer = setTimeout(() => {
            setLocationString(e.target.value)
          }, 500)

        }} />

      </div>
    </div>
  )
}

export default Home
