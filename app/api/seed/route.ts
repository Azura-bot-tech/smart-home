import { User, Contact } from 'lib/schema';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Contact.deleteMany({});

    // Hash password
    const hashedPassword = await bcrypt.hash('admin', 10);

    // Create sample users
    const users = await User.create([
      {
        username: 'admin',
        email: 'admin@example.com',
        password: hashedPassword
      }
    ]);

    // Create sample contacts
    const contacts = await Contact.create([
      {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        message: 'Hello, I am interested in your services.'
      }
    ]);

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      data: {
        users: users.length,
        contacts: contacts.length
      }
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}
