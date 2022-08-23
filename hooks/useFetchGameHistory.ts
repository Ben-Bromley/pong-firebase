import { useState } from 'react'

export default function useFetchGameHistory() {
    const [gameHistory, setGames] = useState(null);
    
    // fetch data from API
    const fetchGames = async (team: string) => {
        let gamesRequest = await fetch('/api/games/get?team=' + team)
        let gamesData = await gamesRequest.json();
        return gamesData;
    }
    
    // invoke function and set state
    const setGameData = async (team: string) => {
        let gamesData = await fetchGames(team);
        return setGames(gamesData.data);
    }
    
    const fetchGameHistory = (team: string) => {
        setGameData(team);
    }

    return [gameHistory, fetchGameHistory]
}
