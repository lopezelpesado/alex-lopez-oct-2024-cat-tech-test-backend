import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

type PouchSize = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

interface Cat {
  name: string;
  subscriptionActive: boolean;
  breed: string;
  pouchSize: PouchSize;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cats: Cat[];
}

@Injectable()
export class CommsService {
  private users: User[] = [];

  constructor() {
    this.loadUsers();
  }

  private async loadUsers() {
    const filePath = path.join(__dirname, '..', 'data', '../../data.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    this.users = JSON.parse(jsonData);
  }

  getUserById(UserId: string) {
    const user = this.users.find((user) => user.id === UserId);

    return user;
  }

  getNextDelivery(id: string) {
    console.log('user: ', this.getUserById(id));

    return {
      title: 'Your next delivery for Dorian and Ocie',
      message:
        "Hey Kayleigh! In two days' time, we'll be charging you for your next order for Dorian and Ocie's fresh food.",
      totalPrice: 134.0,
      freeGift: true,
    };
  }
}
