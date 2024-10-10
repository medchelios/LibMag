import { Response, Request } from "express"
import https from "https"
import crypto from 'crypto';
import { FinesEntity } from "../../entity/FinesEntity"
import { PaymentEntity } from "../../entity/PaymentEntity";
import { AppDataSource } from "../../data-source"
import { paystackSecretKey } from "../../config"
import { UserEntity } from "../../entity/UserEntity"

const userRepository = AppDataSource.getRepository(UserEntity)
const finesRepository = AppDataSource.getRepository(FinesEntity)
const paymentRepository = AppDataSource.getRepository(PaymentEntity)


export const PayFine = async (req: Request, res: Response) => {
    try {
        const {id} = req.body.user
        const {fine_id} = req.body

        const fetchUser = await userRepository.findOneBy({ user_id: id });
        const fineRecord: any = await finesRepository.findOneBy({fine_id: fine_id})
        // request body from the clients
        const email = fetchUser?.email;
        const amount: any = fineRecord?.fine_amount;
        // params
        const params = JSON.stringify({
          "email": email,
          "amount": amount * 100
        })
        // options
        const options = {
          hostname: 'api.paystack.co',
          port: 443,
          path: '/transaction/initialize',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${paystackSecretKey}`, // where you place your secret key copied from your dashboard
            'Content-Type': 'application/json'
          }
        }
        // client request to paystack API
        const clientReq = https.request(options, apiRes => {
          let data = ''
          apiRes.on('data', (chunk: any) => {
            data += chunk
          });
          apiRes.on('end', () => {
            let parseData = JSON.parse(data)
            const paymentRecord = paymentRepository.create({reference: parseData.data?.reference, fine: fineRecord})
            const savePaymentRecord = paymentRepository.save(paymentRecord)
            return res.status(200).json({data: JSON.parse(data)});
          })
        }).on('error', (error: any) => {
          console.error(error)
        })
        clientReq.write(params)
        clientReq.end()
        
      } catch (error) {
        // Handle any errors that occur during the request
        console.error(error);
        res.status(500).json({success: false, message: 'An error occurred' });
    }
}

export const PaymentWebhookVerification = async (req: Request, res: Response) => {
    try {
         //validate event
    const hash = crypto.createHmac('sha512', paystackSecretKey).update(JSON.stringify(req.body)).digest('hex');
    if (hash == req.headers['x-paystack-signature']) {
    // Retrieve the request's body
    const event = req.body;
    // Do something with event
    const checkIfReferenceExists: any = await paymentRepository.findOneBy({reference: event.data?.reference})
    if(!checkIfReferenceExists) {res.send(400)}
    await finesRepository.update({fine_id: checkIfReferenceExists?.fine}, {payment_status: "paid", payment_date: new Date}) 
    }
    res.send(200);
    } catch (error) {
        // Handle any errors that occur during the request
        console.error(error);
        res.status(500).json({success: false, message: 'An error occurred' });
    }
}