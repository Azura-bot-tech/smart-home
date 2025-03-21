'use server';

import { db } from '@/lib/db';
import { users, wallets, categories, transactions, goals, products } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { count, ilike } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

export async function getUsers() {
    return await db.select().from(users);
}

export async function getWallets() {
    return await db.select().from(wallets);
}

export async function getCategories() {
    return await db.select().from(categories);
}

export async function getTransactions() {
    return await db.select().from(transactions);
}

export async function getGoals() {
    return await db.select().from(goals);
}

export async function getWalletsById(userId: number) {
    return await db.select().from(wallets).where(eq(wallets.userId, userId));
}

export async function getTransactionsByWalletId(walletId: number) {
    return await db.select().from(transactions).where(eq(transactions.walletId, walletId));
}

export async function getGoalsByUserId(userId: number) {
    return await db.select().from(goals).where(eq(goals.userId, userId));
}
