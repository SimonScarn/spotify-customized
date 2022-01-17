import {useEffect, useState} from 'react'
import {spotifyAPI} from '../spotify'


export default function useFavoriteTracks(offset) {
    const [loading, setLoading] = useState(true)
    const [favoritesTracks, setFavoritesTracks] = useState([]);

    useEffect(() => {
        setLoading(true);
        spotifyAPI.getMySavedTracks({offset})
            .then(res => {
                setFavoritesTracks(prev => [...prev, ...res.items])
                setLoading(false)
            })
            .catch(err => console.error(err))
    }, [offset]);



    return { favoritesTracks, loading };
}
