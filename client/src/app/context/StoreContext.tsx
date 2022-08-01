import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../models/basket";

interface StoreContextValue{ //props로 일일이 넘겨 주는 대신 context로 데이터을 넘겨줌 
    basket : Basket | null;
    setBasket : (basket: Basket) => void;  //setBasket parameter:Basket / return type:void
    removeItem : (productId: number, quantity: number) => void;
}

//React Context : react x버전을 사용하겠다
//StoreContext.tsx : Basket update. wrap around react component and make the properties and method inside here to all of our application
//component 사용시 props를 넘겨주지 않아도됨 
export const StoreContext = createContext<StoreContextValue | undefined> (undefined);

export function useStoreContext(){
    const context = useContext(StoreContext);

    if(context === undefined){
        throw Error('Oops = we do not seem to be inside the provider');
    }

    return context;
}



export function StoreProvider({children} : PropsWithChildren<any>){

    const[basket, setBasket] = useState<Basket | null>(null);

    function removeItem(productId: number, quantity: number){

        if(!basket) return;
        const items = [...basket.items];
        const itemIndex = items.findIndex(i => i.productId === productId);

        if(itemIndex >= 0){
            items[itemIndex].quantity -= quantity;

            if(items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
            setBasket(prevState => {
                return {...prevState!, items} //!:state safety check
            })
        }
    }

    return(
        <StoreContext.Provider value={{basket, setBasket, removeItem}}>
            {children}
        </StoreContext.Provider>
    )
}
 