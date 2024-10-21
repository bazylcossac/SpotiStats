import React, {useState, useEffect} from 'react'
import { useOutletContext,Link, useSearchParams } from 'react-router-dom'

import { getSpotifyData } from '../api/getSpotifyData'
import getArtistData from '../api/getArtistData'

import {spacedFollowers, popularityWidth} from '../Tools/Tools'

const SearchPage = () => {  
    console.log(' search page');
    const [searchParams, setSearchParams] = useSearchParams()
    console.log(searchParams.get('artist'));
    const artist = searchParams.get('artist').slice(1)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [firstArtist, setFirstArtist] = useState(null)
    const [err, setErr] = useState(false)

    console.log(data);

    useEffect(() => {
        const fetchData = async (params) => {
            const response = await getSpotifyData(params, 1)
            console.log(response);
            if(!response.data.artists.items[0]){
                setErr(true)
            }
            else{
                setErr(false)
                setData(response.data.artists.items)
                setFirstArtist(response.data.artists.items[0])
                setLoading(false)
               
            }
        //    if(response.message){
        //     setErr(true)
        //     setLoading(true)
        //    }
        //    else{
        //     setErr(false)
        //     setLoading(true)
        //    }
        }

        fetchData(artist)
    }, [searchParams.get('artist')])


    if(err || loading){
        return <div className="animate-pulse someWhite font-bold text-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Loading...</div>
    }

  
     return (
        <div>
        <span className='flex flex-row text-[#525252] font-bold p-4'>Results for:<p className='text-white ml-2 truncate'>{searchParams.get('artist').slice(1)}</p> </span>
        
         <div className='px-4 py-4 flex flex-row items-center text-center'>
            <Link to={`/${firstArtist?.id}`}>
                    <div className='bg-[#272727] py-6 px-4 inline-block rounded-lg text-center shadow-lg'>
                        <img src={firstArtist?.images.length !== 0  ? firstArtist?.images[0].url :'./src/images/noImage.jpg'} className='rounded-full size-32' />
                        <p className='text-white font-bold text-xl mt-2'>{firstArtist?.name}</p>
                    </div>
            </Link>

            <div className='flex flex-col justify-between'>
                <span className='ml-4 space-x-2 flex flex-row '>{firstArtist?.genres.slice(0,1).map(genre => <div key={genre} className='text-xs font-bold text-[#313131] text-center bg-[#8B8B8B] px-2 py-1 rounded-lg shadow-lg'>{genre ? genre : 'No genres'}</div>)}</span>
                <div className='bg-[#272727] text-center ml-4 mt-4 py-2 rounded-lg shadow-lg'>
                    <p className='someWhite font-bold'>{firstArtist?.type.toUpperCase()}</p>
                </div>
                <div className='bg-[#272727] ml-4 mt-4 rounded-lg py-2 px-2 text-center shadow-lg'>
                    <p className='someWhite font-bold text-md'>Followers: {spacedFollowers(firstArtist?.followers.total)}</p>
                </div>

                <Link to={firstArtist?.uri}>
                    <div className='bg-[#272727] ml-4 mt-4 flex justify-center rounded-lg shadow-lg'>
                        <svg className='scale-75' xmlns="http://www.w3.org/2000/svg" width="120" height="60"><path d="M22.123 11.828C12.07 11.828 3.952 19.97 3.952 30c0 10.052 8.14 18.172 18.172 18.172 10.052 0 18.172-8.14 18.172-18.172s-8.14-18.172-18.172-18.172zm8.337 26.226c-.326.543-1.02.695-1.563.37-4.277-2.605-9.64-3.19-15.98-1.76-.608.13-1.216-.24-1.346-.847s.24-1.216.847-1.346c6.926-1.585 12.874-.912 17.65 2.02.543.326.716 1.02.39 1.563zm2.214-4.95c-.412.673-1.28.868-1.954.478-4.885-2.996-12.33-3.864-18.106-2.128-.76.217-1.54-.195-1.76-.934-.217-.76.195-1.54.955-1.76 6.6-1.997 14.806-1.042 20.43 2.4.65.39.847 1.26.434 1.932zm.195-5.167c-5.862-3.474-15.523-3.8-21.124-2.106-.9.282-1.845-.24-2.128-1.13s.24-1.845 1.13-2.128c6.426-1.954 17.108-1.563 23.838 2.432.803.478 1.064 1.52.586 2.323-.434.825-1.498 1.086-2.3.608z" fill="#1ed760"/><g transform="matrix(.21375 0 0 .21375 .138028 12.655604)" fill="#1ed760"><path d="M232.1 78.6c-14.5-3.4-17-5.9-17-11 0-4.8 4.5-8 11.2-8 6.5 0 13 2.5 19.8 7.5.2.2.5.2.7.2.3 0 .5-.2.6-.4l7.1-10a.95.95 0 0 0-.2-1.3c-8.1-6.5-17.2-9.6-27.8-9.6-15.6 0-26.5 9.4-26.5 22.8 0 14.4 9.4 19.5 25.7 23.4 13.8 3.2 16.2 5.9 16.2 10.6 0 5.3-4.7 8.6-12.3 8.6-8.4 0-15.3-2.8-23-9.5-.2-.2-.5-.2-.7-.2-.3 0-.5.1-.6.3l-7.9 9.4c-.3.4-.3 1 .1 1.3 9 8 20 12.2 31.9 12.2 16.8 0 27.7-9.2 27.7-23.4-.2-12-7.4-18.6-25-22.9zM295 64.3c-7.3 0-13.3 2.9-18.2 8.8v-6.6c0-.5-.4-.9-.9-.9H263c-.5 0-.9.4-.9.9v73.6c0 .5.4.9.9.9h12.9c.5 0 .9-.4.9-.9v-23.2c4.9 5.5 10.9 8.2 18.2 8.2 13.5 0 27.3-10.4 27.3-30.4-.1-19.9-13.8-30.4-27.3-30.4zm12.2 30.4c0 10.2-6.3 17.2-15.2 17.2s-15.5-7.4-15.5-17.2 6.7-17.2 15.5-17.2 15.2 7.2 15.2 17.2zm50.2-30.4c-17.4 0-31.1 13.4-31.1 30.6 0 17 13.6 30.3 30.9 30.3 17.5 0 31.2-13.4 31.2-30.5 0-17-13.6-30.4-31-30.4zm0 47.7c-9.3 0-16.3-7.5-16.3-17.3 0-9.9 6.8-17.1 16.1-17.1s16.4 7.5 16.4 17.4c-.1 9.8-6.9 17-16.2 17zm68.2-46.5h-14.2V50.9c0-.5-.4-.9-.9-.9h-12.9c-.5 0-.9.4-.9.9v14.6h-6.2c-.5 0-.9.4-.9.9v11.1c0 .5.4.9.9.9h6.2v28.8c0 11.6 5.8 17.5 17.2 17.5 4.6 0 8.5-1 12.1-3 .3-.2.5-.5.5-.8v-10.6c0-.3-.2-.6-.4-.8-.3-.2-.6-.2-.9 0-2.5 1.3-4.9 1.8-7.6 1.8-4.2 0-6-1.9-6-6.1V78.5h14.2c.5 0 .9-.4.9-.9V66.5c-.1-.6-.5-1-1.1-1zm49.7.1v-1.8c0-5.3 2-7.6 6.5-7.6 2.7 0 4.9.5 7.3 1.3.3.1.6 0 .9-.1.2-.2.4-.5.4-.8V45.7c0-.4-.3-.8-.7-.9-2.6-.8-5.8-1.5-10.8-1.5-12 0-18.3 6.7-18.3 19.5v2.7h-6.2c-.5 0-1 .4-1 .9v11.2c0 .5.4.9 1 .9h6.2v44.4c0 .5.4.9.9.9h12.9c.5 0 .9-.4.9-.9V78.5h12.1l18.5 44.4c-2.1 4.7-4.2 5.6-7 5.6-2.3 0-4.7-.7-7.1-2-.2-.1-.5-.1-.8-.1-.2.1-.5.3-.6.5l-4.4 9.6c-.2.5 0 1 .4 1.2 4.6 2.5 8.7 3.5 13.8 3.5 9.6 0 14.8-4.5 19.5-16.4l22.5-58c.1-.3.1-.6-.1-.9s-.5-.4-.8-.4h-13.5c-.4 0-.8.3-.9.6l-13.8 39.4L498 66c-.1-.4-.5-.6-.9-.6h-21.8zm-28.8-.1h-12.9c-.5 0-.9.4-.9.9v56.5c0 .5.4.9.9.9h12.9c.5 0 .9-.4.9-.9V66.5c.1-.6-.4-1-.9-1z"/><circle cx="440.1" cy="49.1" r="9.3"/></g></svg>
                    </div>
                </Link>
              
            </div>


         </div>
    </div>
    )
}
export default SearchPage