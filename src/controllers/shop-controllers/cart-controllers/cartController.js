
import cartServices from "../../../services/cartService.js"
import checkNumber from "../../../utils/checkNumber.js";
const SUCCESS_STATUS = 200;
const BAD_REQUEST_STATUS = 400;
const SERVER_ERROR_STATUS = 500;

const isCartItemsValid = (req) => {
  const { productId, quantity } = req.body;
  if (!productId || !quantity) {
    return false;
  }
  if (!checkNumber.isPositiveInteger(quantity)) {
    return false;
  }
  return true;
};

const addToCart = async (req, res) => {
  try {
    if (!isCartItemsValid(req)) {
      return res.status(BAD_REQUEST_STATUS).send({ success: false, message: "Invalid request" })
    }
    const { productId, quantity } = req.body
    const { success, data } = await cartServices.createCart(req.user._id, productId, quantity)
    if (!success) {
      return res.status(SERVER_ERROR_STATUS).send({ success: false, message: data })
    }
    return res.status(SUCCESS_STATUS).json(data);
  }
  catch (error) {
    return res.status(SERVER_ERROR_STATUS).send({ success: false, message: "Server error" })
  }
}
const removeFromCart = async (req, res) => {
    try {
      const {productId} = req.params;
      const { success, data } = await cartServices.deleteItemFromCart(req.user_id, productId)
      if (!success) {
        return res.status(SERVER_ERROR_STATUS).send({ success: false, message: data })
      }
      return res.status(SUCCESS_STATUS).json(data);
    }
    catch (error) {
      return res.status(SERVER_ERROR_STATUS).send({ success: false, message: "Server error" })
    }
}

const updateCart = async (req, res) => {
  try {
      const {productId, quantity } = req.body;
      const { success, data } = await cartServices.updateCart(req.user_id, productId, quantity);
      if (!success) {
        return res.status(SERVER_ERROR_STATUS).send({ success: false, message: data })
      }
      return res.status(SUCCESS_STATUS).json(data);
  }
  catch (error) {
      return res.status(SERVER_ERROR_STATUS).send({ success: false, message: "Server error" })
  }
};
const getCart = async (req, res) => {
  try {
        const userId = req.user._id;
        const { success, data } = await cartServices.getCartByUserId(userId)
        if (!success) {
            return res.status(BAD_REQUEST_STATUS).send({ success: false, message: data })
        }
        return res.status(SUCCESS_STATUS).json(data);
    }
    catch (error) {
        return res.status(SERVER_ERROR_STATUS).send({ success: false, message: "Server error" })
    }
}
export { addToCart, removeFromCart, getCart,updateCart }