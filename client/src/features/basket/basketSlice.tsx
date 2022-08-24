import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import agent from "../../app/api/agents";
 import { Basket } from "../../app/models/basket"

interface BasketState {
    basket : Basket | null;
    status : string;
}

const initialState : BasketState = {
    basket : null,
    status : 'idle' //redux
}


//redux(state 상태에 따른 Async정의)
export const addBasketItemAsync = createAsyncThunk<Basket, {productId: number, quantity?: number}>(
    'basket/addBasketItemAsync',
    async ({productId, quantity =1 }) => {
        try{
            return await agent.Basket.addItem(productId, quantity);
        }catch(error) {
            console.log(error);
        }
    }
)


export const removeBasketItemAsync = createAsyncThunk<void, 
{productId: number, quantity :number, name?: string}>(
    'basket/removeBasketItemsAsync',
    async ({productId, quantity }) => {
        try{
            await agent.Basket.removeItem(productId, quantity);
        }catch(error){
            console.log(error);
        }
    }
)



export const basketSlice = createSlice ({
    name : 'basket',
    initialState,
    reducers: {
        setBasket:(state, action) => {
            state.basket = action.payload
        }
    },
    
    //redux thunk 처리 (Async 결과에 따른 action) 
    extraReducers: (builder => {
        //Add item to basket
        builder.addCase(addBasketItemAsync.pending, (state, action) => { //pending case
            console.log(action);
            state.status = 'pendingAddItem' + action.meta.arg.productId;  //meta.arg : for console log
            console.log("state.status" + state.status);
        });
        builder.addCase(addBasketItemAsync.fulfilled, (state, action) =>{ //basket을 action payload에 셋팅
            state.basket = action.payload;
            state.status = 'idle';
        });
        builder.addCase(addBasketItemAsync.rejected, (state) =>{ //recject case
            state.status = 'idle';
        });
       
        //Remove item to basket
        builder.addCase(removeBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingRemoveItem' + action.meta.arg.productId + action.meta.arg.name;
        });
        builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
            const {productId, quantity} = action.meta.arg;
            const itemIndex = state.basket?.items.findIndex(i => i.productId === productId);
            if(itemIndex === 1 || itemIndex === undefined) return;
            state.basket!.items[itemIndex].quantity -= quantity!;
            if(state.basket?.items[itemIndex].quantity === 0)
            state.basket.items.splice(itemIndex,1);
            state.status ='idle';
        })
        builder.addCase(removeBasketItemAsync.rejected, (state) => {
            state.status = 'idle';
        })
    })
})

export const {setBasket} = basketSlice.actions;
