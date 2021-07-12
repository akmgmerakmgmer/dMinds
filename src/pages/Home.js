import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import * as actionCreators from '../store/actions'
import NewCategory from '../components/NewCategory'
import Movies from "../components/Movies";
const Home = ()=>{
    const [categoryName,setCategoryName] = useState('')
    const [categoryDescription,setCategoryDescription] = useState('')
    const [newMovies,setNewMovies]=useState({
        id:new Date(),
        name:'No Movies to Show'
    })
    const [rerender,setRerender]=useState(false)
    const {movies} = useSelector((state)=>({...state}))
    //Fetching Data
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(actionCreators.fetchMovies())
    },[rerender])
    //End Fetching Data

    //Handling New Category
    const handleNewCategory = (e)=>{
        e.preventDefault()
        if(categoryName.trim()!==''){
            const newCategory = {
                id: new Date(),
                movies:[newMovies],
                name:categoryName,
                description:categoryDescription,
            }
            const caca = movies 
            caca.push(newCategory)
            axios.put('https://dminds-9b171-default-rtdb.firebaseio.com/categories.json',caca)
                .then(response=>{
                    setRerender(!rerender)
                    setCategoryDescription('')
                    setCategoryName('')
                })
        }
    }
    //End Handeling New Category
    
    return(
        <div>
            <NewCategory 
            newTitle={(e)=>setCategoryName(e.target.value)}
            newDescription={(e)=>setCategoryDescription(e.target.value)}
            handleNewCategory={handleNewCategory}
            categoryName={categoryName}
            categoryDescription={categoryDescription}
            />
            <div className="bg-white mx-md-5 mx-3 px-md-5 px-3 py-5 my-4 rounded">
            {movies.map((m,categoryIndex)=>(
                <Movies key={m.id} m={m} categoryIndex={categoryIndex} categoryId={categoryIndex}/>
            ))}
            </div>
        </div>
    )
}
 
export default Home