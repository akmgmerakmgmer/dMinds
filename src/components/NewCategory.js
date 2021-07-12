import { TextField, Typography, Button } from "@material-ui/core"
const newCategory = (props)=>(
    <div className="bg-white mx-md-5 mx-3 px-md-5 px-3 py-5 my-4 rounded">
        <Typography variant="h5" component="h1" className="pb-4">Add Category</Typography>
        <form>
            <TextField id="title" label="Name*" type="text" className="pt-1 w-50 pr-4" onChange={props.newTitle} value={props.categoryName}/>
            <TextField id="title" label="Description*" type="text" className="pt-1 w-50 pr-4" onChange={props.newDescription} value={props.categoryDescription}/>
            <Button variant="contained" className="mt-4 category-button" onClick={props.handleNewCategory}>Add Category</Button>
        </form>
    </div>
)
export default newCategory