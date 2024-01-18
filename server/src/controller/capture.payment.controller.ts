import { NextFunction, Response } from "express";
import { AppError } from "../utils/appError";
import { Request, catchAsync } from "../utils/catchAsync";
import { capturePaymentCallBack } from "../paymentService/capture.payment";


const capturePayment = catchAsync (
    async (req: Request, res: Response, next: NextFunction) =>{
        const {
            upiId,
            customerName,
            custRefNo,
            orderId,
            transactionId,
            txnStatus,
            couponStatus,
            couponReferenceNumber,
            external_id,
            txnTime
        } = req.body;

        if (!req.body) {
            next(new AppError("Please fill all the required fields", 400));
        }

        const reqData = req.body;
        const response = await capturePaymentCallBack(reqData,next)


        res.status(201).json({
            status: "success",
            error: false,
            message: "paymentRequestUrl get successfully",
            data: response,
          });


    }
);

export {
    capturePayment
}