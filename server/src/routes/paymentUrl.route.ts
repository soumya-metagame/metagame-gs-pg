import { Router } from "express";
import { getpaymentRequestUrl } from "../controller/paymentUrl.controller";
import {capturePayment} from '../controller/capture.payment.controller'
import {celebrate, Joi, errors, Segments} from 'celebrate'

const router = Router();

router.route('/payment_url').post(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        userId: Joi.string().required(),
        customerName: Joi.string().required(),
        mobileNumber: Joi.string().required(),
        referenceId: Joi.string().required(),
        returnUrl: Joi.string().required(),

      }),
    }),
    getpaymentRequestUrl as any
  );

  router.route('/capture_payment').post(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        upiId: Joi.string().required(),
        amount: Joi.string().required(),
        customerName: Joi.string().required(),
        custRefNo: Joi.string().required(),
        orderId: Joi.string().required(),
        transactionId: Joi.string().required(),
        txnStatus:Joi.string().required(),
        couponStatus:Joi.string().required(),
        couponReferenceNumber:Joi.string().required(),
        external_id:Joi.string().required(),
        txnTime:Joi.string().required(),
        CAPTURE_PAYMENT_URL:Joi.string().required(),

      }),
    }),
    capturePayment as any
  );

 


export default router;

