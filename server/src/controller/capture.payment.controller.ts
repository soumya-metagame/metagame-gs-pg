import { NextFunction, Response } from "express";
import { AppError } from "../utils/appError";
import { Request, catchAsync } from "../utils/catchAsync";
import { paymentCapture } from "../model/capture.payment";
import { io } from "..";


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

          io.emit('paymentCapture', {
            status: 'success',
            error: false,
            message: 'Payment Capture successfully',
            data: newPaymentCapture,
          });

          res.status(201).json({
            status: "success",
            error: false,
            message: "Payment Capture  successfully",
            data: newPaymentCapture,
          });

        //   console.log("response get from 3rd party",res)


    }
);

const getCapturePaymentStatus = catchAsync(
    async (req:Request, res:Response, next:NextFunction) =>{
        const refId = req.params.id;

        const capturePayment = await paymentCapture.find({orderId:refId})

        if (!capturePayment) {
            return next(new AppError(`No capture payment found with this id ${refId}`, 404));
          }

          res.status(200).json({
            status: "success",
            error: false,
            message: "capture payment fetched successfully",
            data: capturePayment,
          });
    }
)

export {
    capturePayment,
    getCapturePaymentStatus
}