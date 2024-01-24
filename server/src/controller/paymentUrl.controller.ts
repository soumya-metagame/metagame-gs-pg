import { NextFunction, Response } from "express";
import { AppError } from "../utils/appError";
import { Request, catchAsync } from "../utils/catchAsync";
import { getVoucherPaymentUrl } from "../paymentService/getPaymentUrl.service";
import {paymentRequestUrl} from '../model/paymentUrl.model'


const getpaymentRequestUrl = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const {
            userId,
            customerName,
            mobileNumber,
            referenceId,
            amount,
            emailId,
            returnUrl,

        } = req.body;
        if (!req.body) {
            next(new AppError("Please fill all the required fields", 400));
        }

         const requestBody = req.body;
         const response = await getVoucherPaymentUrl(requestBody,next)

         const newPaymentUrl = await paymentRequestUrl.create({
            userId,
            customerName,
            mobileNumber,
            referenceId,
            amount,
            emailId,
            returnUrl,
            dataUrl:response?.data?.url
           
          });

          res.status(201).json({
            status: "success",
            error: false,
            message: "paymentRequestUrl get successfully",
            data: newPaymentUrl,
          });
    }
);

export {getpaymentRequestUrl}