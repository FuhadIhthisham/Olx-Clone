import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {FirebaseContext, AuthContext} from '../../store/FirebaseContext'
import { useHistory } from 'react-router-dom';

const Create = () => {

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)

  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const date = new Date()
  const history = useHistory()

  const handleSubmit = ()=>{
    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
        
        firebase.firestore().collection('products').add({
          name,
          category,
          price,
          url,
          userId: user.uid,
          createdAt: date.toDateString()
        })
        history.push('/')
      })
    })
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="name"> Product Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="name"
              onChange={(e)=>setName(e.target.value)}
              value={name}
              name="Name"
            />
            <br />
            <label htmlFor="category">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="category"
              onChange={(e)=>setCategory(e.target.value)}
              value={category}
              name="category"
            />
            <br />
            <label htmlFor="price">Price</label>
            <br />
            <input 
              className="input" 
              type="number" 
              id="price" 
              onChange={(e)=>setPrice(e.target.value)}
              value={price}
              name="Price" />
            <br />
          
          <br />
          <img 
            alt="Posts" 
            width="200px" 
            height="200px" 
            src={ image ? URL.createObjectURL(image): 'https://www.logistec.com/wp-content/uploads/2018/03/no-image-icon-6.png'}></img>
          
            <br />
            <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
