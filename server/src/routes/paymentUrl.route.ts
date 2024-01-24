import { Router } from "express";
import { getpaymentRequestUrl } from "../controller/paymentUrl.controller";
import {capturePayment} from '../controller/capture.payment.controller'
import {celebrate, Joi, errors, Segments} from 'celebrate'

const router = Router();

/**
   * @openapi
   * /payment_url:
   *  post:
   *    tags:
   *      - Authenticate
   *    summary: login using google
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              code:
   *                type: string
   *                required: true
   *    responses:
   *      '200':
   *        description: Successfully registered user
   */

router.route('/payment_url').post(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        userId: Joi.string().required(),
        customerName: Joi.string().required(),
        mobileNumber: Joi.string().required(),
        referenceId: Joi.string().required(),
        amount: Joi.string().required(),
        emailId: Joi.string().required(),
        returnUrl: Joi.string().required(),

      }),
    }),
    getpaymentRequestUrl as any
  );

  /**
   * @openapi
   * /capture_payment:
   *  post:
   *    tags:
   *      - Authenticate
   *    summary: login using google
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              code:
   *                type: string
   *                required: true
   *    responses:
   *      '200':
   *        description: Successfully registered user
   */

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
        txnTime:Joi.string().required(),

      }),
    }),
    capturePayment as any
  );

 


export default router;

