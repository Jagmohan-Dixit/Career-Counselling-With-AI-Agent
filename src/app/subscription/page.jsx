'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {getSubscriptionPlans, SubscriptionPlan} from '@/services/subscription';
import {useEffect, useState} from 'react';

export default function SubscriptionPage() {
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const plans = await getSubscriptionPlans();
      setSubscriptionPlans(plans);
    };

    fetchPlans();
  }, []);

  return (
    <div className="container mx-auto mt-8 p-8">
      <h1 className="text-3xl font-semibold mb-6">Subscription Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subscriptionPlans.map((plan, index) => (
          <Card key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="text-xl font-bold mb-2">${plan.price}</div>
              <Button className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Subscribe
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

