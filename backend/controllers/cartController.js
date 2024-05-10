import userModel from "../models/userModel.js";

//add to cart


const addToCart = async (req, res) => {
    try {
        // Find user data by user ID
        let userData = await userModel.findById(req.body.userId);

        // Check if user data is found
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        // Access cartData and update it based on itemId
        let cartData = userData.cartData || {};
        cartData[req.body.itemId] = (cartData[req.body.itemId] || 0) + 1;

        // Update cartData in the database
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });

        // Send success response
        res.json({ success: true, message: "Added to Cart" });
    } catch (error) {
        // Log and send error response
        console.log(error);
        res.json({ success: false, message: "Error adding to cart" });
    }
};

const removeFromCart = async (req,res) =>{
    try {
        let userData  = await userModel.findById(req.body.userId);
        //console.log(userData.cartData);
        
        let cartData = await userData.cartData;

        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
            await userModel.findByIdAndUpdate(req.body.userId, { cartData });
            res.json({ success: true, message: "Removed From Cart" });
        }else{
            res.json({ success: true, message: "Empty Cart" });
        }

        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing from cart" });
    }
}


//fetch user cart data

const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);

        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {}; // Initialize cartData to an empty object if it's not available

        res.json({ success: true, cartData }); // Send cartData in the response
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching cart data" });
    }
}


export {addToCart,removeFromCart,getCart}