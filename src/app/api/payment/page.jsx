'use client';
import { useState } from 'react';
import Script from 'next/script';
import { Button } from '@/components/ui/button';
import { useSelector, useDispatch} from "react-redux";
import { capturePayment, verifyPayment, sendVerifyEmail } from '../../../services/operations/paymentAPI';



function Payment() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('200');
    const [currency, setCurrency] = useState('INR');
    const dispatch = useDispatch();
    const user  = useSelector((state) => state?.profile?.user);
    const { token } = useSelector((state) => state.auth)
    console.log("user in payment page : ", user)



const processPayment = async (e) => {
  e.preventDefault();
  try {
   const res = await dispatch(capturePayment(token, {amount :parseFloat(amount)}));
   const orderId = res.orderId;
   console.log("res : ", res)
   const options = {
    key: "rzp_test_aFHgpPQ2Qr3esy",
    amount: parseFloat(amount) * 100,
    currency: currency,
    name: 'name',
    description: 'description',
    order_id: orderId,
    handler: async function (response) {
     const data = {
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_order_id: response.razorpay_order_id,
      razorpay_signature: response.razorpay_signature,
     };
     console.log("data : ", data)

     const res = await dispatch(verifyPayment(token, data));
     if (res.success) { 
        alert("payment succeed");
        const res = await dispatch(sendVerifyEmail(token, {
            razorpay_order_id : response.razorpay_order_id, 
            razorpay_payment_id : response.razorpay_payment_id, 
            amount}));
    }
     else {
      alert(res.message);
     }
    },
    prefill: {
     name: name,
     email: email,
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

   <section className="min-h-[94vh] flex flex-col gap-6 h-14 mx-5 sm:mx-10 2xl:mx-auto 2xl:w-[1400px] items-center pt-36 ">
    <form
     className="flex flex-col gap-6 w-full sm:w-80"
     onSubmit={processPayment}
    >
        <Button className='p-4 bg-primary text-white mt-10'>Pay</Button>
    </form>
   </section>
  </>
 );
}

export default Payment;


// client = razorpay.Client(auth=("rzp_test_aFHgpPQ2Qr3esy", "wJPj0PREZEPGzNTS25e4p4Ac"))
