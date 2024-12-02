import Cart from '../models/Cart.js';

const cartService = {

    async createCart(userId,productId,quantity=1){
        let cart = await Cart.findOne({userId:userId})
        if(!cart)
        {
            cart = new Cart({userId:userId,items:[]})
        }
        const productIndex =cart.items.findIndex(item =>item.productId.toString()===productId)
        if(productIndex>-1)
        {
            cart.items[productIndex].quantity+=quantity;
        }
        else{
            cart.items.push({productId,quantity})
        }
        await cart.save()
        const populateCart = await cart.populate('items.productId','name price image')
        return ({success:true,data:populateCart});
    },
    async deleteCart(userId,productId,quantity){
        const cart=await Cart.findOne({userId})
        if(!cart){
            return ({success:false,data:"Cart not found"})
        }
        if(productId)
        {
            const itemIndex = cart.items.findIndex(item=>item.productId.toString()===productId)
            if(itemIndex===-1){
              return ({success:false,data:"Product not found in cart"})
            }
            if(quantity){
                cart.items[itemIndex].quantity-=quantity
                if(cart.items[itemIndex].quantity<=0){
                    cart.items.splice(itemIndex,1)
                }
            }
            else{
                cart.items.splice(itemIndex,1)
            }
            await cart.save()
            return {success:true,data:cart}
        }
        else{
            const deleteCart = await Cart.findOneAndDelete({userId})
            if(!deleteCart)return ({success:false,data:"Can not delete cart"})
            return ({success:true,data:deleteCart})
        }
    },
    async getCartByUserId(userId){
        const cartItem = await Cart.findOne({userId:userId})
        console.log(cartItem)
        if(!cartItem){
            return ({success:false,data:"Can not found cart"})
        }
        return ({success:true,data:cartItem})
    }
}

export default cartService
