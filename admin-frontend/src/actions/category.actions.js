import  {categoryConstants} from './constants';
import axios from '../helpers/axios'

export const getAllCategory = ()=>{
    return async dispatch =>{

        dispatch({type:categoryConstants.GET_ALL_CATEGORIES_REQUEST});
        const res = await axios.get('category/getCategory');   console.log('3333333',res); 
        
        if(res.status ==  200)
        {
            const {categoryList} = res.data;
            dispatch(
                {
                    type:categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                    payload: {categories: categoryList}
                }
            )
        }else
        {
            dispatch(
                {
                    type:categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                    payload: {categories: res.data.error}
                }
            )
        }
        //res.status(200).json({res});
    }
}