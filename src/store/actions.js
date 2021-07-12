import axios from "axios"
export const GETMOVIES = 'GETMOVIES'
const getMovies = (movies)=>{
    return{
        type:GETMOVIES,
        payload:movies
    }
}
 export const fetchMovies = ()=>{
     return dispatch =>{
        axios.get('https://dminds-9b171-default-rtdb.firebaseio.com/categories.json')
            .then(response=>{
                const fetchedData=[]
                for (let k in response.data){
                    fetchedData.push({...response.data[k]})
                }
                dispatch(getMovies(fetchedData))
            })
     }
     
 }
