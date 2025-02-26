import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

type PouchSize = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

const PouchSizePrices: Record<PouchSize, number> = {
  A: 55.5,
  B: 59.5,
  C: 62.75,
  D: 66.0,
  E: 69.0,
  F: 71.25,
};

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

  getActiveCats(cats: Cat[]) {
    return cats.filter((cat) => cat.subscriptionActive);
  }

  getFormattedCatNameList(cats: Cat[]) {
    return cats.reduce((acc, cat, index) => {
      if (index === 0) {
        return cat.name;
      } else if (index === cats.length - 1) {
        return `${acc} and ${cat.name}`;
      } else {
        return `${acc}, ${cat.name}`;
      }
    }, '');
  }

  getNextDelivery(id: string) {
    const user = this.getUserById(id);
    if (!user) return; // TODO: handle no user
    const activeCats = this.getActiveCats(user.cats);
    if (!activeCats.length) return; // TODO: handle no active cats
    const formattedCatNameList = this.getFormattedCatNameList(activeCats);

    const title = `Your next delivery for ${formattedCatNameList}`;
    const message = `Hey ${user.firstName}! In two days' time, we'll be charging you for your next order for ${formattedCatNameList}'s fresh food.`;
    const totalPrice = activeCats.reduce((acc, cat) => {
      return acc + PouchSizePrices[cat.pouchSize];
    }, 0);
    const freeGift = totalPrice > 120;

    return {
      title,
      message,
      totalPrice,
      freeGift,
    };
  }
}
