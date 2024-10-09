import { Test, TestingModule } from '@nestjs/testing';
import { CommsService } from './comms.service';

describe('CommsService', () => {
  let service: CommsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommsService],
    }).compile();

    service = module.get<CommsService>(CommsService);

    service['users'] = [
      {
        id: 'ff535484-6880-4653-b06e-89983ecf4ed5',
        firstName: 'Kayleigh',
        lastName: 'Wilderman',
        email: 'Kayleigh_Wilderman@hotmail.com',
        cats: [
          {
            name: 'Dorian',
            subscriptionActive: true,
            breed: 'Thai',
            pouchSize: 'C',
          },
          {
            name: 'Ocie',
            subscriptionActive: true,
            breed: 'Somali',
            pouchSize: 'F',
          },
          {
            name: 'Eldridge',
            subscriptionActive: false,
            breed: 'Himalayan',
            pouchSize: 'A',
          },
        ],
      },
    ];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the correct delivery message and details for the user', () => {
    const userId = 'ff535484-6880-4653-b06e-89983ecf4ed5';
    const expectedResponse = {
      title: 'Your next delivery for Dorian and Ocie',
      message:
        "Hey Kayleigh! In two days' time, we'll be charging you for your next order for Dorian and Ocie's fresh food.",
      totalPrice: 134,
      freeGift: true,
    };

    const result = service.getNextDelivery(userId);

    expect(result).toEqual(expectedResponse);
  });
});
