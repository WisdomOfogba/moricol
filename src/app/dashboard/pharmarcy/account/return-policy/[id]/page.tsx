"use client";
import Button from "@/components/button";
import { routes } from "@/constants/routes";

import { useRouter, useParams } from "next/navigation";

export default function ReturnPolicy() {
  const { id } = useParams();
  const router = useRouter();
  return (
    <section className="text-sm">
      <div className="border-b border-gray-300 pt-5">
        <h2 className="pb-5 font-bold text-primary-500">
          &larr; Return Policy
        </h2>
      </div>
      
      <h2 className='font-semibold'>Return and Refund Policy </h2>
      
      <p className='py-5'>Eligibility for Returns Only</p> 
      <p className="my-5 text-gray-500">
      i) Unopened and unused products only are eligible for return. <br />
       ii) Prescription medications cannot be returned unless they are defective or damaged.  <br />
       iii) Returns must be within 48 hours.  <br />   
       Return Process: Users will receive a 48-hour span to return goods of the order delivery.  <br />
        iv) Users are advised to contact our customer support team to 
        initiate a return authorization number and return shipping instructions.
         Users are to package the items securely, including the original packaging and any 
         accompanying documentation. 
         Users are to ship the package to the designated return address using the provided shipping details.
         </p>

         <p className='py-5'>Refunds:</p> 
         
          1) Refunds will be issued to the original payment method.
          Refunds take 5 business days to process.
           However, return shipping costs are the responsibility of the user (customer) unless the return is defective product due to our error.
           <p className='py-5'>Exceptions:</p>  
           <p>
           In the event of receiving a damaged or defective product,
             please contact Customer Support immediately.
              We will provide a prepaid shipping label for returns 
              and issue a full refund replacement. 
              In the event of receiving a wrong Or an incorrect order, 
              please contact our customer support team immediately,
               and we will arrange for a correct product to be
                shipped to you at no additional cost and provide a 
                prepaid shipping label for the return of the incorrect item.
           </p>
             
    

      <form
        className="mt-5"
        action={() => router.push(routes.PHARMARCYRETURNPRODUCT + `/${id}`)}
      >
        <div className="flex items-center gap-x-2">
          <input type="checkbox" id="agree" className="h-5 w-5" />
          <label htmlFor="agree" className="text-gray-500">
            You have agreed to our return policy
          </label>
        </div>
        <Button className="mt-10 lg:max-w-[360px]">Continue</Button>
      </form>
    </section>
  );
}
