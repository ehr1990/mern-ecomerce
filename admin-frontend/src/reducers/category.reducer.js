import { categoryConstants } from "../actions/constants"


const initState = {
    categories:[],
    loading: false,
    error:null
   // message: '',
   
}

const buildNewCategories = (parentId,categories,category)=>{
    let myCategories = [];
    if(parentId == undefined){
        return [
            ...categories,
            {
                _id:category._id,
                name:category.name,
                slug:category.slug,
                children: []
            }
        ]
    }

    for(let cat of categories){

        if(cat._id==parentId){
            myCategories.push({
                ...cat,
                children: cat.children && cat.children.lenght>0 ? buildNewCategories(parentId,[...cat.children,{
                    _id:category._id,
                    name:category.name,
                    parentId:category.parentId,
                    slug:category.slug,
                    children:category.children
                }], category): []
            })
        }else{
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId,cat.children, category): []
            })
        }

        
    }
    return myCategories;
}
export default (state = initState, action)=>{
    switch(action.type){
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories:action.payload.categories
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            
            //const  category = action.payload.category;
            //const updatedCategories = buildNewCategories(category.parentId,state.categories,category);
            state = {
                ...state,
                //categories:updatedCategories,
                loading:true
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:

            const  category = action.payload.category;
            const updatedCategories = buildNewCategories(category.parentId,state.categories,category);
            
            //const updatedCategories = buildNewCategories(state.categories, action.payload.category);
            console.log('33333 inside reducer',updatedCategories);
            state = {
                ...state,
                categories:updatedCategories,
                loading:false
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
            state = {
               ...initState
            }
            break;
    }
    return state;     
}