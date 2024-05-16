import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    try {
        // Create a new order
        const newOrder = new orderModel({
            userId: req.body.userId,
            userEmail: req.body.userEmail, // Add user's email address to the order details
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        
        // Save the new order
        await newOrder.save();

        // Clear user's cart after placing the order
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
       

        // Construct line items for Stripe payment
        const lineItems = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100, // Convert to cents
            },
            quantity: item.quantity
        }));

        

        // Add delivery charges as a line item
        lineItems.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery charges"
                },
                unit_amount: 6000, // 60 INR in cents
            },
            quantity: 1
        });

        // Create a checkout session with Stripe
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: `${req.headers.origin}/verify?success=true&orderId=${newOrder._id}&order=${newOrder}}`,
            cancel_url: `${req.headers.origin}/verify?success=false&orderId=${newOrder._id}`,
        });

        

        // Send response with session ID
        res.json({success:true, id: session.id });
        

    } catch (error) {
        console.error("Error placing order from backend:", error);
        res.status(500).json({ success: false, message: "Error placing order from backend" });
    }
};


const verifyOrder  = async (req,res) =>{
     const {orderId,success}  = req.body;

     try {
        if(success == "true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"})
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false, message: "Not Paid"})
        }
     } catch (error) {
          console.log(error);
          res.json({success:false,message:"Error"})
     }
}

//user orders for frontend

const userOrders =async ( req, res )=>{
     try {
        const orders = await orderModel.find({userId:req.body.userId})
       // console.log(orders);
        res.json({success:true,data:orders})
     } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error from ordercontroller"})
     }
}

const getOrderById = async (req, res) => {
    try {
        console.log("hey");
        const orderId = req.orderId;
        const order = await orderModel.findById(orderId);
        res.json({ success: true, data: order });
    } catch (error) {
        console.error('Error retrieving order:', error);
        res.status(500).json({ success: false, message: 'Error retrieving order' });
    }
};



//Listing order for admin panel

const listorders = async (req, res)=>{

    try {
        const orders = await orderModel.find({})
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// api for updating order status 


const updateStatus = async (req,res) =>{
  try {
      await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
      res.json({success:true,messgage:"Status Updated"})
  } catch (error) {
    console.log(error);
      res.json({success:false, message:"Error"})
  }
}

export { placeOrder,verifyOrder,userOrders,listorders,updateStatus,getOrderById};
