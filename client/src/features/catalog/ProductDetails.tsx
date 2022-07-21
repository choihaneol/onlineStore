import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agents";
import NotFound from "../../app/api/errors/NoFound";

//useParams : returns object of key/value pairs of URL parameters
export default function ProductDetails() {
    const {id} = useParams<{id:string}>();
    const [product, setProduct] = useState<Product|null>(null);//component에 product 가져옴
    const [loading, setLoading] = useState(true); //component를 초기화할때 loading=true

    //사용자의 요청(URL)에 의해 product id를 서버에 요청, 에러시 예외처리
    useEffect(()=>{
        agent.Catalog.details(parseInt(id!))
             .then(response => setProduct(response))
             .catch(error=> console.log(error.response))
             .finally(()=> setLoading(false));
    },[id])
    
    if(loading) return <h3>Loading...</h3>

    if(!product) return <NotFound/>



    return (
      <Grid container spacing={6}>
        <Grid item xs={6}>
            <img src={product.pictureUrl} alt={product.name} style={{width:'100%'}}/>
        </Grid>
      <Grid item xs={6}>
        <Typography variant='h3'>{product.name}</Typography>
        <Divider sx={{mb:2}}/>
<Typography variant='h4' color='secondary'>${(product.price / 100).toFixed(2)}</Typography>
<TableContainer>
    <Table>
        <TableBody>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
            </TableRow>
        </TableBody>
    </Table>
</TableContainer>
      </Grid>
      </Grid>
    )
}