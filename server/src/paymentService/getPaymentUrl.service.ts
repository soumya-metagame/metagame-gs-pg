import axios from "axios";
import { NextFunction, Response } from "express";
import { AppError } from "../utils/appError";
import exp from "constants";

interface PaymentRequestUrlType {
    userId: string;
    customerName: string;
    mobileNumber: string;
    referenceId: string;
    returnUrl: string;
    dataUrl:string
  }

const BASE_URL = 'https://preprod.gifton.app/coupon-svc'; 
const clientSecret = 'a7a14a7b-be03-4c67-8414-cb2784dd151c'; 
const programId = 'f59b551d-7044-4246-93d6-c5bef52e71e9'; 

const getVoucherPaymentUrl = 
    async (urlData:PaymentRequestUrlType, next:NextFunction) =>{
        if(!urlData){
            next(new AppError("Please fill all the required fields", 400));
 
        }
        try{

            const response = await axios.post(
                `${BASE_URL}/api/v1/external/url/generate`,
                urlData,
                {
                  headers: {
                    'client_secret': clientSecret,
                    'program_id': programId,
                  },
                }
              );
            
              console.log('Response in payment services:', response.data);
              return response.data
        }
        catch (error){
          return {
            error: true,
            message: error,
        };
        }
    }

  export {
    getVoucherPaymentUrl
  }
