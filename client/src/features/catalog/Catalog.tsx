import ProductList from "./ProductList";
import { Product } from "../../app/models/product";
import { useState, useEffect } from "react";


export default function Catalog() {

    const [products, setProducts] = useState<Product[]>([]); //useState : component에 state변수와 state 추가

  useEffect(() => { //useEffect : 값의 변화가 일어났을때 실행
    fetch('http://localhost:5000/api/products') //for header
      .then(response => response.json())
      .then(data => setProducts(data))
  }, []) //렌더링될때 한번만 실행 


    return (
        <>
            <ProductList products={products}/>           
        </>
    )
}