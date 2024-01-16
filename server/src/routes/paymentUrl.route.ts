import { Router } from "express";
import { getpaymentRequestUrl } from "../controller/paymentUrl.controller";
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

// router.route("/payment_url").post( getpaymentRequestUrl as any);

export default router;

