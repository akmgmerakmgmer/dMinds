import { Typography,TextField,Button } from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu';
import Alert from '@material-ui/lab/Alert'
import axios from "axios";
import { useState,useEffect} from "react"
import {useSelector,useDispatch } from "react-redux"
import * as actionCreators from '../store/actions'
import Movie from "./Movie";
const Movies = ({m,categoryIndex,categoryId}) =>{
    const [isActive,setIsActive]=useState(false)
    const [rerender,setRerender]=useState(false)
    const [newMovie,setNewMovie]=useState('')
    const [newMovieDescription,setNewMovieDescription]=useState('')
    const [error,setError]=useState('Please Enter Your Full Data')
    const [errorActive,setErrorActive]=useState(false)
    const [removeButtons,setRemoveButtons]=useState(true)
    const {movies} = useSelector((state)=>({...state}))
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(actionCreators.fetchMovies())
    },[rerender])
    //Handling Delete
    const deleteMovie=(categoryId,movieId)=>{
        if(movies[categoryId].movies.length==1){
            setRemoveButtons(true)
            const newMovie = {
                description:newMovieDescription,
                name:'No Movies to Show',
                id: new Date()
            }
            const caca = movies[categoryId].movies
            caca.push(newMovie)
            axios.put(`https://dminds-9b171-default-rtdb.firebaseio.com/categories/${categoryId}/movies.json`,caca)
                .then(response=>{

                })
        }
        const caca = movies[categoryId].movies
        caca.splice(movieId,1)
        axios.put(`https://dminds-9b171-default-rtdb.firebaseio.com/categories/${categoryId}/movies.json`,caca)
            .then(response=>{
                setRerender(!rerender)
            })
        
        
        
    }
    //End Handling Delete

    //Adding New Movie
    const addMovie = (newMovieId)=>{
        setRemoveButtons(false)
        if(newMovie.trim()!=='' && newMovieDescription.trim()!==''){
            setErrorActive(false)
            if(movies[newMovieId].movies[0].name==='No Movies to Show'){
                const newAddedMovie = {
                    description:newMovieDescription,
                    name:newMovie,
                    id: new Date()
                }
                const caca = movies[newMovieId].movies
                caca.push(newAddedMovie)
                caca.splice(0,1) 
                axios.put(`https://dminds-9b171-default-rtdb.firebaseio.com/categories/${newMovieId}/movies.json`,caca)
                    .then(response=>{
                        setRerender(!rerender)
                        setNewMovie('')
                        setNewMovieDescription('')
                })
            }else{
                const newAddedMovie = {
                    description:newMovieDescription,
                    name:newMovie,
                    id: new Date()
                }
                const caca = movies[newMovieId].movies
                caca.push(newAddedMovie)
                axios.put(`https://dminds-9b171-default-rtdb.firebaseio.com/categories/${newMovieId}/movies.json`,caca)
                    .then(response=>{
                        setRerender(!rerender)
                        setNewMovie('')
                        setNewMovieDescription('')
                })
            }
            
        }else{
            setErrorActive(true)
            if(movies[newMovieId].movies[0].name==='No Movies to Show'){
                setRemoveButtons(true)
            }else{
                setRemoveButtons(false)
            }
            
        }
        
    }
    //End Adding New Movie

    //Handeling Edit and Delete Activation
    const handleButton=(index)=>{
        if(movies[index].movies[0].name==='No Movies to Show'){
            setIsActive(!isActive)
            setRemoveButtons(true)
        }else{
            setIsActive(!isActive)
            setRemoveButtons(false)
        }
    }
    return(
        <div key={m.id} className="my-4">
            <div className="d-flex accordion p-3" onClick={()=>handleButton(categoryIndex)}>
                <MenuIcon className="mr-1 mt-1"/>
                <Typography variant="h6" component="h2" className="">{m.name}</Typography>
            </div>
            <div className={`${isActive?'d-block':'d-none'}`}>
                <div className="bg-light mt-2 p-3 m-3">
                    <h5>Add Movie</h5>
                    <form>
                        <TextField id="title" label="Name*" type="text" className="pt-1 w-50 pr-4" onChange={(e)=>setNewMovie(e.target.value)} value={newMovie}/>
                        <TextField id="title" label="Description*" type="text" className="pt-1 w-50 pr-4" onChange={(e)=>setNewMovieDescription(e.target.value)} value={newMovieDescription}/>
                        {errorActive?<Alert className="mt-4" variant="filled" severity="error">{error}</Alert>:null}
                        <Button variant="contained" className="mt-4 category-button" onClick={()=>addMovie(categoryIndex)}>Add Movie</Button>
                    </form>
                </div>
                {m.movies?.map((movie,index)=>(
                    <div key={index}>
                        <Movie 
                        movie={movie} 
                        deleteMovie={()=>deleteMovie(categoryIndex,index)} 
                        categoryId={categoryId}
                        movieId={index}
                        removeButtons={removeButtons}
                        />
                    </div>
                ))}
            </div>
            
        </div>   
          
    )
}

export default Movies