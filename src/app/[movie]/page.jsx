import Image from 'next/image';
import React from 'react'
import Link from 'next/link'



export async function generateStaticParams(){
    const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`)
    const res = await data.json()
    return res.results.map((movie)=>({
        movie: toString(movie.id),
         
    }))
}

const MovieDetail = async ({params}) => {
const {movie} = params;
    const imagePath = "https://image.tmdb.org/t/p/original"

    const data = await fetch(`https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`)
    const res = await data.json();
  return (
    <div>
        <div>
            <h2 className='text-2xl'>{res.title}</h2>
            <h2 className=' text-lg' >{res.release_date}</h2>
            <h2>Runtime: {res.runtime} minutes</h2>
            <h2 className=' text-sm bg-green-600 inline-block my-2 py-2 px-4 rounded-md'>{res.status}</h2>
                <Link className=' font-mono border p-2 m-2 rounded-md bg-green-400' href={"/"}> <button>go home</button></Link>
                <Image
                 className='my-12 w-full'
                  src={imagePath + res.backdrop_path}
                  alt={res.id}
                   width={1000}
                    height={1000}
                    priority
                    />
                    <p>{res.overview}</p>
        </div>
    </div>
  )
}

export default MovieDetail