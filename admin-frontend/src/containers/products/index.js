import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout'
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap'
import Input from '../../components/UI/Input';
import { addProduct } from '../../actions';


/**
* @author
* @function Products
**/

const Products = (props) => {

  const category = useSelector(state => state.category);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [productPictures, setProductPictures] = useState([]);
  const [show, setShow] = useState(false);


  const handleClose = () =>{
    const form = new FormData();
    form.append('name',setName);
    form.append('quantity',setQuantity);
    form.append('price',setPrice);
    form.append('description',setDescription);
    form.append('category',setCategoryId);
    for(let pic of productPictures)
    {
        form.append('productPicture',pic);
    }

    dispatch(addProduct(form));
    /*
    
    const prd = {
        productName,
        parentCategoryId,
        categoryImage
    }
    */
    setShow(false);
}
const handleShow = () => setShow(true);



const createCategoryList = (categories, options=[])=>{
  for(let category of categories){
      options.push({value:category._id,name:category.name});
      if(category.children.length>0){
          createCategoryList(category.children, options);
      }
  }
  return options;
}

const handleProductPictures = (e)=>{
  setProductPictures([
    ...productPictures,
    e.target.files[0]
  ]);
}

  return(
   <Layout sidebar>
       <Container>
          <Row>
                <Col md={12}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h3>Products</h3>
                        <button onClick={handleShow}>Add</button>
                    </div>
                </Col>
            </Row>
       </Container>
       <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        label="Name"
                        value={name}
                        placeholder={`Product Name`}
                        onChange={(e)=>setName(e.target.value)}
                    />
                     <Input
                        label="Quantity"
                        value={quantity}
                        placeholder={`Quantity`}
                        onChange={(e)=>setQuantity(e.target.value)}
                    />

                    <Input
                        label="Price"
                        value={price}
                        placeholder={`Price`}
                        onChange={(e)=>setPrice(e.target.value)}
                    />
                     <Input
                        label="Description"
                        value={description}
                        placeholder={`Description`}
                        onChange={(e)=>setDescription(e.target.value)}
                    />

                    <select className="form-control" value={categoryId} onChange={(e)=>setCategoryId(e.target.value)}>
                        <option value="">Select option</option>
                        {
                            createCategoryList(category.categories).map(option=>
                                <option key={option.value} value={option.value}>{option.name}</option>)
                        }
                    </select>

                    {
                      productPictures.length>0 ? 
                      productPictures.map((pic,index)=> <div key={index}>{pic.name}</div>) : null
                    }
                    <input  type='file' name="productPicture" onChange={handleProductPictures}/>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

   </Layout>
   )

 }

export default Products