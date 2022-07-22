import ProductList from "./ProductList";
import { Product } from "../../app/models/product";
import { useState, useEffect } from "react";
import agent from "../../app/api/agents";
import LoadingComponent from "../../app/layout/LoadingComponent";



export default function Catalog() {

  const [products, setProducts] = useState<Product[]>([]); //useState : component에 state변수와 state 추가
  const [loading, setLoading] = useState(true);


  useEffect(() => { //useEffect : 값의 변화가 일어났을때 실행
    agent.Catalog.list()
    .then(products => setProducts(products))
    .catch(error => console.log(error))
    .finally(() => setLoading(false))
  }, []) //[] : 렌더링될때 한번만 실행 


  if (loading) return <LoadingComponent message='Loading products...'/>



    return (
        <>
            <ProductList products={products}/>           
        </>
    )
}