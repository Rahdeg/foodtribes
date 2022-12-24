 export const actionType = {
    SET_USER:"SET_USER",
    SET_FOOD_ITEMS :"SET_FOOD_ITEMS",
    SET_CART_SHOW :"SET_CART_SHOW",
    SET_CART_ITEM :"SET_CART_ITEM",
    SET_PAYMENT_DETAIL :"SET_PAYMENT_DETAIL",
    SET_BIKE_DETAIL :"SET_BIKE_DETAIL",
    SET_ALLUSERS :"SET_ALLUSERS",
    SET_ALLITEMS :"SET_ALLITEMS",
    SET_TOTALAMOUNT :"SET_TOTALAMOUNT",
 }

 const reducer= (state, action)=>{

    switch(action.type){
        case actionType.SET_TOTALAMOUNT:
            return {
                ...state,
                totalAmount:action.totalAmount,
            };

        case actionType.SET_BIKE_DETAIL:
            return {
                ...state,
                bikedetails:action.bikedetails,
            };

        case actionType.SET_PAYMENT_DETAIL:
            return {
                ...state,
                paymentdetails:action.paymentdetails,
            };
        
            case actionType.SET_ALLITEMS:
                return {
                    ...state,
                    allItems:action.allItems,
                };

        case actionType.SET_ALLUSERS:
                return {
                    ...state,
                    allUsers:action.allUsers,
                };

        case actionType.SET_USER:
            return {
                ...state,
                user:action.user,
            };
            case actionType.SET_FOOD_ITEMS:
            return {
                ...state,
                foodItems:action.foodItems,
            };
            case actionType.SET_CART_SHOW:
                return {
                    ...state,
                    cartShow:action.cartShow,
                };
             case actionType.SET_CART_ITEM:
                return {
                    ...state,
                    cartItem:action.cartItem,
                };
            
            default :
            return state;
    }
 };

 export default reducer;