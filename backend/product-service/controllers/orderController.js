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

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch orders' });
    }
}

exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const allowedStatuses = ['pending', 'dispatched', 'delivered'];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status value' });
  }

  try {
    const updatedOrder = await orderModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, order: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};