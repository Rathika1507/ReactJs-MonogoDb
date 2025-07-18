const orderModel = require('../models/orderModel')

exports.createOrder = async(req,res,)=>{
    const { cartItems, email } = req.body;
    const amount = Number(cartItems.reduce((acc, item)=>(acc+item.product.price * item.qty),0)).toFixed(2);
    const status =  'pending';
    const createdAt = new Date();
    const order = await orderModel.create({cartItems,amount,status,createdAt,email})
    res.json({ success:true, order })
}

exports.getOrders = async (req, res,) => {
    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }
        const orders = await orderModel.find({ email }).sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch orders' });
    }
}