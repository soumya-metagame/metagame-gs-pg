import { NextFunction, Response } from "express";
import { AppError } from "../utils/appError";
import { Request, catchAsync } from "../utils/catchAsync";
import { paymentCapture } from "../model/capture.payment";


const capturePayment = catchAsync (
    async (req: Request, res: Response, next: NextFunction) =>{
        const {
            upiId,
            amount,
            customerName,
            custRefNo,
            orderId,
            transactionId,
            txnStatus,
            txnTime,
        } = req.body;

        if (!req.body) {
            next(new AppError("Please fill all the required fields", 400));
        }



        const newPaymentCapture = await paymentCapture.create({
            upiId,
            amount,
            customerName,
            custRefNo,
            orderId,
            transactionId,
            txnStatus,
            txnTime,
           
          });

          res.status(201).json({
            status: "success",
            error: false,
            message: "Payment Capture  successfully",
            data: newPaymentCapture,
          });

          console.log("response get from 3rd party",res)


    }
);

export {
    capturePayment
}