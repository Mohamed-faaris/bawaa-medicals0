import {
    pgTable,
    serial,
    text,
    varchar,
    timestamp,
    pgEnum,
    integer,
    jsonb,
    index,
    foreignKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enum for user roles
export const userRoleEnum = pgEnum("user_role", ["admin", "staff", "customer"]);

export const orderStatusEnum = pgEnum("order_status", [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
]);

// Users table
export const users = pgTable(
    "users",
    {
        id: serial("id").primaryKey(),
        name: varchar("name", { length: 255 }).notNull(),
        email: varchar("email", { length: 255 }).notNull().unique(),
        phone: varchar("phone", { length: 20 }),
        address: text("address"),
        createdAt: timestamp("created_at").defaultNow(),
        updatedAt: timestamp("updated_at").defaultNow(),
    },
    (table) => ({
        emailIdx: index("users_email_idx").on(table.email),
    })
);

// Accounts table (authentication & role info)
export const accounts = pgTable(
    "accounts",
    {
        id: serial("id").primaryKey(),
        userId: integer("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        password: varchar("password", { length: 255 }).notNull(),
        role: userRoleEnum("role").default("customer").notNull(),
        isActive: integer("is_active").default(1).notNull(),
        lastLogin: timestamp("last_login"),
        createdAt: timestamp("created_at").defaultNow(),
        updatedAt: timestamp("updated_at").defaultNow(),
    },
    (table) => ({
        userIdIdx: index("accounts_user_id_idx").on(table.userId),
    })
);

// Orders table
export const orders = pgTable(
    "orders",
    {
        id: serial("id").primaryKey(),
        userId: integer("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        status: orderStatusEnum("status").default("pending").notNull(),
        totalAmount: integer("total_amount"), // in cents
        notes: text("notes"),
        createdAt: timestamp("created_at").defaultNow(),
        updatedAt: timestamp("updated_at").defaultNow(),
    },
    (table) => ({
        userIdIdx: index("orders_user_id_idx").on(table.userId),
        statusIdx: index("orders_status_idx").on(table.status),
    })
);

// Uploads table (prescription uploads, order documentation, etc.)
export const uploads = pgTable(
    "uploads",
    {
        id: serial("id").primaryKey(),
        orderId: integer("order_id")
            .notNull()
            .references(() => orders.id, { onDelete: "cascade" }),
        url: varchar("url", { length: 500 }).notNull(),
        description: text("description"),
        isPrescription: integer("is_prescription").default(0),
        metadata: jsonb("metadata"), // Store additional metadata as JSON
        uploadedAt: timestamp("uploaded_at").defaultNow(),
    },
    (table) => ({
        orderIdIdx: index("uploads_order_id_idx").on(table.orderId),
    })
);

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
    account: one(accounts, {
        fields: [users.id],
        references: [accounts.userId],
    }),
    orders: many(orders),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
    user: one(users, {
        fields: [accounts.userId],
        references: [users.id],
    }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
    user: one(users, {
        fields: [orders.userId],
        references: [users.id],
    }),
    uploads: many(uploads),
}));

export const uploadsRelations = relations(uploads, ({ one }) => ({
    order: one(orders, {
        fields: [uploads.orderId],
        references: [orders.id],
    }),
}));
