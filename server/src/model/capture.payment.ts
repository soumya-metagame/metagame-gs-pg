import mongoose, { Document, Schema, Types } from 'mongoose';


interface capturePaymentType {
    upiId:string;
    amount:string;
    customerName:string;
    custRefNo:string;
    orderId:string;
    transactionId:string;
    txnStatus:string;
    couponStatus:string;
    couponReferenceNumber:string;
    external_id:string;
    txnTime:string;
}

const paymentCaptureSchema = new Schema<capturePaymentType>({
    upiId: { type: String, required: true },
    amount: { type: String, required: true },
    customerName: { type: String },
    custRefNo: { type: String, required: true },
    orderId: { type: String, required: true },
    transactionId: { type: String, required: true },
    txnStatus: { type: String,required: true },
    txnTime: { type: String, required: true },

  })

  const paymentCapture = mongoose.model<capturePaymentType>(
    "paymentCapture",
    paymentCaptureSchema
  );
  
  export { paymentCapture, capturePaymentType };