import { TextField, Typography } from "@material-ui/core"
import axios from "axios";
import { useState,useEffect} from "react"
import {useDispatch } from "react-redux"
import * as actionCreators from '../store/actions'
const Movie = (props)=>{
    const [editName,setEditName]=useState(false)
    const [newName,setNewName]=useState('')
    const [newDescription,setNewDescription]=useState('')
    const [rerender,setRerender]=useState(false)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(actionCreators.fetchMovies())
    },[rerender])
    const nameEdit=(categoryId,movieId)=>{
        if(newName.trim()!=='' && newDescription!==''){
            const name = {
                id:props.movie.id,
                name:newName,
                description:newDescription,
                rate:props.movie.rate
            }
            axios.put(`https://dminds-9b171-default-rtdb.firebaseio.com/categories/${categoryId}/movies/${movieId}.json`,name)
                .then(response=>{
                    setEditName(false)
                    setRerender(!rerender)
                })
        }
        
    }
    return(
        <div className="movie mt-2 p-3 m-3">
            <div className='d-flex flex-column flex-md-row justify-content-between '>
                <div>
                    {!editName?<p>{props.movie.name}</p>:<div>
                    <TextField type='text' label="Set New Name" onChange={(e)=>setNewName(e.target.value)} value={newName}/><br/>
                    </div>}
                </div>
                {!editName && !props.removeButtons?<div>
                    <button className="edit-button default-button" onClick={()=>setEditName(true)}>Edit</button>
                    <button className="delete-button default-button" onClick={props.deleteMovie}>Delete</button>
                </div>:null}
                
            </div>
            {!editName?<Typography variant="caption" component="p" className="mt-3">{props.movie.description}</Typography>:<div>
            <TextField className="mt-3" type='text' label="Set New Description" onChange={(e)=>setNewDescription(e.target.value)} value={newDescription}/><br/>   
            </div>}
            {!editName?null:<button className="default-button edit-button mt-3" onClick={()=>nameEdit(props.categoryId,props.movieId)}>Set New Name</button> }
        </div>
    )
    
}

export default Movie