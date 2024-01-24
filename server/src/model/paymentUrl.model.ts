import mongoose, { Document, Schema, Types } from 'mongoose';



interface PaymentRequestUrlType {
    userId: string;
    customerName: string;
    mobileNumber: string;
    referenceId: string;
    amount: string;
    emailId:string;
    returnUrl: string;
    dataUrl:string;
  }

  const paymentRequestUrlSchema = new Schema<PaymentRequestUrlType>({
    userId: { type: String, required: true },
    customerName: { type: String },
    mobileNumber: { type: String },
    referenceId: { type: String, required: true },
    amount: { type: String, required: true },
    emailId: { type: String, required: true },
    dataUrl: { type: String, required: true },


  })

  const paymentRequestUrl = mongoose.model<PaymentRequestUrlType>(
    "paymentRequestUrl",
    paymentRequestUrlSchema
  );
  
  export { paymentRequestUrl, PaymentRequestUrlType };
