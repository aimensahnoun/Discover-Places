import type { NextPage } from 'next'
import Head from 'next/head'


const Home: NextPage = () => {
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
        <input type="text" placeholder="Type locations" className="input input-bordered w-full max-w-xs" />

      </div>
    </div>
  )
}

export default Home
