import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agents";
import { Product } from "../../app/models/product";
import { RootState } from "../../app/store/configureStore";

const productsAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[]>(
    'catalog/fetchProductsAsync',
    async () => {
        try{
            return await agent.Catalog.list();
        }catch (error){
            console.log(error);
        }
    }
)

export const catalogSlice = createSlice({
    name : 'catalog',
    initialState : productsAdapter.getInitialState({
        productsLaoded : false,
        status : 'idle'
    }),
    reducers : {},
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts';
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state,action) => {
            productsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.productsLaoded = true;
        });
        builder.addCase(fetchProductsAsync.rejected, (state) => {
            state.status = 'idle';
        })
    })
})


export const productSelectors = productsAdapter.getSelectors((state:RootState) => state.catalog);