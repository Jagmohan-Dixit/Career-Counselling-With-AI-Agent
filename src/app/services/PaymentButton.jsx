'use client';

import Script from 'next/script';
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useSelector, useDispatch} from "react-redux";
import { capturePayment, verifyPayment, sendVerifyEmail } from '../../services/operations/paymentAPI';


function PaymentButton({id, user, token, amount, item_key, currency="INR"}) {
    const dispatch = useDispatch();
    const navigate = useRouter();
    console.log(user, token, amount, item_key, currency)

    const processPayment = async (e) => {
        e.preventDefault();
        try {
            if(!user || !token) {
                return navigate.push('/login');
            }
            const res = await dispatch(capturePayment(token, {amount}));
            const orderId = res.orderId;
            console.log("res : ", res)

            const options = {
                key: "rzp_test_aFHgpPQ2Qr3esy",
                amount: amount,
                currency: currency,
                name: user?.firstName + " " + user?.lastName,
                description: 'description',
                order_id: orderId,

                handler: async function (response) {
                    const data = {
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                        plan_id : id
                    };
                    // console.log("data : ", data)

                    const res = await dispatch(verifyPayment(token, data));
                    console.log("res verify : ", res);
                    if (res.success) { 
                        // alert("payment succeed");
                        // toast.success("Payment Successfull");
                        const result = await dispatch(sendVerifyEmail(token, {
                            razorpay_order_id : response.razorpay_order_id, 
                            razorpay_payment_id : response.razorpay_payment_id, 
                            amount
                        }));
                        if(result.success) {
                            navigate.push("/")
                        }
                    }
                    // else {
                    //     // alert(res.message);
                    //     toast.error(res.message);
                    // }
                },

                prefill: {
                    name: user?.firstName + " " + user?.lastName,
                    email: user?.email,
                },
                theme: {
                    color: '#3399cc',
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.on('payment.failed', function (response) {
                alert(response.error.description);
            });
            paymentObject.open();
        } catch (error) {
            console.log(error);
        }
    };

 return (
  <>
   <Script
    id="razorpay-checkout-js"
    src="https://checkout.razorpay.com/v1/checkout.js"
   />

    <form onSubmit={processPayment} className="mt-auto flex justify-center">
        <Button className={`mt-auto px-8 bg-primary font-bold border-none ${String(item_key) == "premium" ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black" : "text-white"}`}>Choose Plan</Button>
    </form>
  </>
 );
}

export default PaymentButton;


// client = razorpay.Client(auth=("rzp_test_aFHgpPQ2Qr3esy", "wJPj0PREZEPGzNTS25e4p4Ac"))
