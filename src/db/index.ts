import Dexie, { Table } from 'dexie';
import { User, UserSettings, MetricsData } from '../types/database';

export class AppDatabase extends Dexie {
  users!: Table<User>;
  settings!: Table<UserSettings>;
  metrics!: Table<MetricsData>;

  constructor() {
    super('InteractiveSystemDB');
    
    this.version(1).stores({
      users: '++id, email, name, title, company, createdAt',
      settings: '++id, userId, theme, language, notifications',
      metrics: '++id, platform, type, value, date'
    });
  }
}

export const db = new AppDatabase();

// Initialize with default user if none exists
export async function initializeDatabase() {
  const userCount = await db.users.count();
  
  if (userCount === 0) {
    await db.users.add({
      email: 'tapiwa@interactivecue.com',
      name: 'Taps Marimbe',
      title: 'Marketing Manager',
      company: 'Interactive Cue',
      createdAt: new Date()
    });
  }
}