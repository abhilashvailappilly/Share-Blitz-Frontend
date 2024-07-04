
export default interface VerificationInterface {
    _id: string;
    userId: string;
    verificationStatus: 'Pending' | 'Approved';
    planActive: boolean;
    payment: {
      plan?: '10 days' | '20 days' | '30 days';
      paymentStatus: 'Done' | 'Pending';
      amount?:number
      startDate?: Date;
      endDate?: Date;
    };
    imageUrl: string;
  }

 export interface SinlgeRowInterface{
    verification:VerificationInterface
 }