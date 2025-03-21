import { db } from 'lib/db';
import { users, wallets, transactions, categories } from 'lib/schema';

export const dynamic = 'force-dynamic';

export async function GET() {
  // Seed Users trước
  const insertedUsers = await db.insert(users).values([
    { name: "Alice", email: "alice@example.com", passwordHash: "hashedpassword1" },
    { name: "Bob", email: "bob@example.com", passwordHash: "hashedpassword2" },
  ]).returning({ id: users.id });

  // Lấy id từ users đã insert
  const userIds = insertedUsers.map(u => u.id);

  // Seed Categories
  await db.insert(categories).values([
    { id: 1, name: "Food & Drinks", type: "expense" },
    { id: 2, name: "Transport", type: "expense" },
    { id: 3, name: "Salary", type: "income" },
  ]);

  // Seed Wallets với userId hợp lệ
  const insertedWallets = await db.insert(wallets).values([
    { userId: userIds[0], name: "Cash", balance: "500.00", currency: "USD" },
    { userId: userIds[0], name: "Bank Account", balance: "1500.00", currency: "USD" },
    { userId: userIds[1], name: "E-Wallet", balance: "200.00", currency: "USD" },
  ]).returning({ id: wallets.id });

  // Lấy id từ wallets đã insert
  const walletIds = insertedWallets.map(w => w.id);

  // Seed Transactions
  await db.insert(transactions).values([
    { walletId: walletIds[0], categoryId: 1, type: "expense", amount: "20.00", description: "Lunch" },
    { walletId: walletIds[1], categoryId: 3, type: "income", amount: "2000.00", description: "Monthly Salary" },
    { walletId: walletIds[2], categoryId: 2, type: "expense", amount: "15.00", description: "Taxi Ride" },
  ]);

  return Response.json({
    message: "Database seeded successfully.",
  });
}
