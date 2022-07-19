import ProductList from "./ProductList";
import { Product } from "../../app/models/product";
import { useState, useEffect } from "react";
import agent from "../../app/api/agents";


export default function Catalog() {

    const [products, setProducts] = useState<Product[]>([]); //useState : component에 state변수와 state 추가

  useEffect(() => { //useEffect : 값의 변화가 일어났을때 실행
    agent.Catalog.list().then(products => setProducts(products))
  }, []) //렌더링될때 한번만 실행 


    return (
        <>
            <ProductList products={products}/>           
        </>
    )
}