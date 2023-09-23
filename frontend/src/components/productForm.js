import React,{useState} from 'react'
import "./productForm.css"
import Card from "./card.js"
import { useToast } from '@chakra-ui/react'

import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input,InputGroup,InputRightElement} from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";


export default function ProductForm({product, setProduct ,collectData, buttonText, picLoading, setPicLoading}) {
  const toast = useToast();
  const [free, setFree] = useState(false);
  const handleClick = () => {
    setFree(!free);
    setProduct(()=> {
      if(free) {
        return{...product, price:""}
      } else {
        return{...product, price:"free"}
      }
    })
  };


function imageUpload (image) {
  setPicLoading(true);
  if(image === undefined) {
    toast({
      title: 'Please select an image',
      position: "bottom",
      status: 'warning',
      duration: 3000,
      isClosable: true,
    })
    setPicLoading(false)
    return;
  }
  console.log(image);

  if(image.type === 'image/jpeg' || image.type === 'image/png') {
    setPicLoading(true)
    const data = new FormData();
    data.append("file", image)
    data.append("upload_preset", "bookshelf")
    data.append("cloud_name", "dj6x7fggp");
    fetch("https://api.cloudinary.com/v1_1/dj6x7fggp/image/upload",{
    method: "post",
    body: data,
  })
  .then((res)=> res.json())
  .then(data=> {
    setProduct(()=> {return{...product,src: data.url.toString()}})
    // console.log(data.url.toString());
    setPicLoading(false)
  })
  .catch(err=> {
    toast({
      title: "try again",
      description: 'cannot upload image try an image of lesser resolution',
      position: "bottom",
      status: 'warning',
      duration: 3000,
      isClosable: true,
    });
    setPicLoading(false);
  })
  } else {
    toast({
      title: 'Please select an jpeg or png format image',
      position: "bottom",
      status: 'warning',
      duration: 3000,
      isClosable: true,
    });
    setPicLoading(false);
    return;
  }
}

const checkValidation = async (e) => {
  // console.log("validation clicked")
  setPicLoading(true);
  if (!product.name || !product.brand || !product.price || !product.category) {
 
    toast({
      title: "Please Fill all the Feilds",
      status: "warning",
      duration: 2000,
      isClosable: true,
      position: "bottom",
    });
    setPicLoading(false);
    return;
  }
 
  try {
   
   collectData();
    setPicLoading(false);
  
  } catch (error) {
    toast({
      title: "Error Occured! cannot add product",
      description: error.response.data.message,
      status: "error",
      duration: 4000,
      isClosable: true,
      position: "bottom",
    });
    setPicLoading(false);
  }
};

  return (
 
<div className='mainDivForForm'>

      <h1 className='heading'>add product</h1>
 <div className='divForFormAndCard'>
  <div className='secondryDivForForm' style={{width: "100%"}}>
    <div className='divForForm'>
    <VStack >
      <FormControl className="form-group">
      <FormLabel className='errorLabels'>book name*</FormLabel>
      <Input value={product.name} onChange={e=> setProduct(()=> {return{...product,name: e.target.value}})} autoFocus type="text"  placeholder="enter the book name"/>
      </FormControl>
  
  
      <FormControl className="form-group">
     <FormLabel className='errorLabels'>Price*</FormLabel>
     <InputGroup size="md">
      <Input value={product.price} onChange={e=> setProduct(()=> {return{...product,price: e.target.value}})} maxLength="8" type="text"  placeholder="enter price in ₹" />
      <InputRightElement width="8rem" margin-right="0">
        <Button h="2rem" size="md" onClick={handleClick}>
          {free ? "sell for price" : "sell for free"}
        </Button>
      </InputRightElement>
      </InputGroup>
      </FormControl>
  
      <FormControl className="form-group">
    <FormLabel className='errorLabels'>Publisher*</FormLabel>
      <Input value={product.brand} onChange={e=> setProduct(()=> {return{...product,brand: e.target.value}})} maxLength="24" type="text"   placeholder="enter the publisher of book" />
      </FormControl>
  
      <FormControl className="form-group">
       <FormLabel className='errorLabels'>description*</FormLabel>
      <Input value={product.category} onChange={e=> setProduct(()=> {return{...product,category: e.target.value}})} maxLength="200" type="text" placeholder="enter the book description" />
      </FormControl>
  
      <FormControl className="form-group">
     <FormLabel className='errorLabels'>upload the image</FormLabel>
      <Input p={1.5} onChange={e=> imageUpload(e.target.files[0])}  accept="image/*" type="file" placeholder="book image" />
      </FormControl>
  
       <Button  
       className="nButton" 
       style={{ marginTop: 15 }}
       onClick={checkValidation} 
       isLoading={picLoading}
       >
        {buttonText}
        </Button>

       </VStack>
    </div>
   </div>

  <Card props={product}/>

 </div>
</div>
      
  )
}