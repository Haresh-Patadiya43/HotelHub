const Payment = require("../models/Payment");

const createPayment = async (req, res) => {
  try {
    const { bookingId, userId, amount, transactionId } = req.body;

    if (!bookingId || !userId || !amount || !transactionId) {
      return res.status(400).json({
        message: "All payment details are required",
      });
    }

    const payment = await Payment.create({
      bookingId,
      userId,
      amount,
      transactionId,
      paymentMethod: "UPI QR",
      status: "pending",
    });

    res.status(201).json({
      message: "Payment submitted successfully",
      payment,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Payment submission failed",
    });
  }
};

module.exports = {
  createPayment,
};