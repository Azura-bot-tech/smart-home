import {
    pgTable,
    text,
    numeric,
    integer,
    timestamp,
    pgEnum,
    serial,
  } from "drizzle-orm/pg-core";
  
  // Enum loại giao dịch
  export const transactionTypeEnum = pgEnum("transaction_type", ["income", "expense"]);
  
  // Bảng Users
  export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  });
  
  // Bảng Wallets
  export const wallets = pgTable("wallets", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id).notNull(),
    name: text("name").notNull(),
    balance: numeric("balance", { precision: 12, scale: 2 }).notNull(),
    currency: text("currency").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  });
  
  // Bảng Categories
  export const categories = pgTable("categories", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    type: transactionTypeEnum("type").notNull(),
  });
  
  // Bảng Transactions
  export const transactions = pgTable("transactions", {
    id: serial("id").primaryKey(),
    walletId: integer("wallet_id").references(() => wallets.id).notNull(),
    categoryId: integer("category_id").references(() => categories.id).notNull(),
    type: transactionTypeEnum("type").notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    description: text("description"),
    transactionDate: timestamp("transaction_date").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  });
  
  // Bảng Goals
  export const goals = pgTable("goals", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id).notNull(),
    name: text("name").notNull(),
    targetAmount: numeric("target_amount", { precision: 12, scale: 2 }).notNull(),
    currentAmount: numeric("current_amount", { precision: 12, scale: 2 }).default("0"),
    dueDate: timestamp("due_date"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  });
  

  export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);


  export const products = pgTable('products', {
    id: serial('id').primaryKey(),
    imageUrl: text('image_url').notNull(),
    name: text('name').notNull(),
    status: statusEnum('status').notNull(),
    price: numeric('price', { precision: 10, scale: 2 }).notNull(),
    stock: integer('stock').notNull(),
    availableAt: timestamp('available_at').notNull()
  });

  