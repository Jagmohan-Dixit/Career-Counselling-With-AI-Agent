/**
 * Represents a subscription plan.
 */
export interface SubscriptionPlan {
  /**
   * The name of the subscription plan.
   */
  name: string;
  /**
   * The price of the subscription plan.
   */
  price: number;
  /**
   * The description of the subscription plan.
   */
  description: string;
}

/**
 * Retrieves a list of available subscription plans.
 * @returns A promise that resolves to an array of SubscriptionPlan objects.
 */
export async function getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      name: 'JEE Basic',
      price: 99,
      description: 'Basic JEE counselling plan. Includes access to basic study materials and weekly mock tests.',
    },
    {
      name: 'JEE Premium',
      price: 199,
      description: 'Premium JEE counselling plan. Includes personalized study schedule, advanced materials, and one-on-one counselling sessions.',
    },
    {
      name: 'NEET Basic',
      price: 99,
      description: 'Basic NEET counselling plan. Includes access to basic study materials and weekly mock tests.',
    },
    {
      name: 'NEET Premium',
      price: 199,
      description: 'Premium NEET counselling plan. Includes personalized study schedule, advanced materials, and one-on-one counselling sessions.',
    },
  ];
}
