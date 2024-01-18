import axios from "axios";
import { NextFunction, Response } from "express";
import { AppError } from "../utils/appError";




interface capturePaymentType {
    upiId:string;
    customerName:string;
    custRefNo:string;
    orderId:string;
    transactionId:string;
    txnStatus:string;
    couponStatus:string;
    couponReferenceNumber:string;
    external_id:string;
    txnTime:string;
    CAPTURE_PAYMENT_URL:string
}


const capturePaymentCallBack = 
    async (reqData:capturePaymentType, next:NextFunction ) =>{
        if(!reqData){
            next(new AppError("Please fill all the required fields", 400));
 
        }

        try{

            const response = await axios.get(
                `${reqData.CAPTURE_PAYMENT_URL}`,
                // reqData,
                
              );
            
              console.log('Response in payment CAPTURE services:', response.data);
              return response.data
        }
        catch (error){

          return {
            error: true,
            message: error,
        };
        }
    };

    export {
        capturePaymentCallBack
      }

      


