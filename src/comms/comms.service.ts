import { Injectable } from '@nestjs/common';

@Injectable()
export class CommsService {
  getNextDelivery(id: string) {
    console.log({ id });

    return {
      title: 'Your next delivery for Dorian and Ocie',
      message:
        "Hey Kayleigh! In two days' time, we'll be charging you for your next order for Dorian and Ocie's fresh food.",
      totalPrice: 134.0,
      freeGift: true,
    };
  }
}
