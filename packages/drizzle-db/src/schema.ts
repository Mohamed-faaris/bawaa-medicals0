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
    decimal,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const userRoleEnum = pgEnum("user_role", ["admin", "staff", "customer", "delivery"]);

export const orderStatusEnum = pgEnum("order_status", [
    "pending",
    "processing",
    "ready",
    "delivered",
    "cancelled",
]);

export const orderTypeEnum = pgEnum("order_type", ["prescription", "items"]);

export const deliveryStatusEnum = pgEnum("delivery_status", [
    "picked",
    "on_the_way",
    "delivered",
    "failed",
]);

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

export const products = pgTable(
    "products",
    {
        id: serial("id").primaryKey(),
        name: varchar("name", { length: 255 }).notNull(),
        description: text("description"),
        price: integer("price").notNull(),
        stock: integer("stock").default(0).notNull(),
        category: varchar("category", { length: 100 }),
        imageUrl: varchar("image_url", { length: 500 }),
        createdAt: timestamp("created_at").defaultNow(),
        updatedAt: timestamp("updated_at").defaultNow(),
    },
    (table) => ({
        categoryIdx: index("products_category_idx").on(table.category),
    })
);

export const orders = pgTable(
    "orders",
    {
        id: serial("id").primaryKey(),
        orderNumber: varchar("order_number", { length: 20 }).notNull().unique(),
        userId: integer("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: orderTypeEnum("type").default("items").notNull(),
        status: orderStatusEnum("status").default("pending").notNull(),
        totalAmount: integer("total_amount").notNull(),
        deliveryFee: integer("delivery_fee").default(0),
        deliveryAddress: text("delivery_address"),
        notes: text("notes"),
        prescriptionUrl: varchar("prescription_url", { length: 500 }),
        createdAt: timestamp("created_at").defaultNow(),
        updatedAt: timestamp("updated_at").defaultNow(),
    },
    (table) => ({
        userIdIdx: index("orders_user_id_idx").on(table.userId),
        statusIdx: index("orders_status_idx").on(table.status),
        orderNumberIdx: index("orders_order_number_idx").on(table.orderNumber),
    })
);

export const orderItems = pgTable(
    "order_items",
    {
        id: serial("id").primaryKey(),
        orderId: integer("order_id")
            .notNull()
            .references(() => orders.id, { onDelete: "cascade" }),
        productId: integer("product_id")
            .notNull()
            .references(() => products.id, { onDelete: "cascade" }),
        quantity: integer("quantity").notNull(),
        price: integer("price").notNull(),
    },
    (table) => ({
        orderIdIdx: index("order_items_order_id_idx").on(table.orderId),
        productIdIdx: index("order_items_product_id_idx").on(table.productId),
    })
);

export const uploads = pgTable(
    "uploads",
    {
        id: serial("id").primaryKey(),
        orderId: integer("order_id")
            .references(() => orders.id, { onDelete: "cascade" }),
        url: varchar("url", { length: 500 }).notNull(),
        description: text("description"),
        isPrescription: integer("is_prescription").default(0),
        metadata: jsonb("metadata"),
        uploadedAt: timestamp("uploaded_at").defaultNow(),
    },
    (table) => ({
        orderIdIdx: index("uploads_order_id_idx").on(table.orderId),
    })
);

export const deliveries = pgTable(
    "deliveries",
    {
        id: serial("id").primaryKey(),
        orderId: integer("order_id")
            .notNull()
            .references(() => orders.id, { onDelete: "cascade" }),
        deliveryPersonId: integer("delivery_person_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        status: deliveryStatusEnum("status").default("picked").notNull(),
        pickedAt: timestamp("picked_at"),
        deliveredAt: timestamp("delivered_at"),
        deliveryNotes: text("delivery_notes"),
        createdAt: timestamp("created_at").defaultNow(),
        updatedAt: timestamp("updated_at").defaultNow(),
    },
    (table) => ({
        orderIdIdx: index("deliveries_order_id_idx").on(table.orderId),
        deliveryPersonIdIdx: index("deliveries_delivery_person_id_idx").on(table.deliveryPersonId),
    })
);

export const usersRelations = relations(users, ({ one, many }) => ({
    account: one(accounts, {
        fields: [users.id],
        references: [accounts.userId],
    }),
    orders: many(orders),
    deliveries: many(deliveries),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
    user: one(users, {
        fields: [accounts.userId],
        references: [users.id],
    }),
}));

export const productsRelations = relations(products, ({ many }) => ({
    orderItems: many(orderItems),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
    user: one(users, {
        fields: [orders.userId],
        references: [users.id],
    }),
    items: many(orderItems),
    uploads: many(uploads),
    delivery: one(deliveries),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
    order: one(orders, {
        fields: [orderItems.orderId],
        references: [orders.id],
    }),
    product: one(products, {
        fields: [orderItems.productId],
        references: [products.id],
    }),
}));

export const uploadsRelations = relations(uploads, ({ one }) => ({
    order: one(orders, {
        fields: [uploads.orderId],
        references: [orders.id],
    }),
}));

export const deliveriesRelations = relations(deliveries, ({ one }) => ({
    order: one(orders, {
        fields: [deliveries.orderId],
        references: [orders.id],
    }),
    deliveryPerson: one(users, {
        fields: [deliveries.deliveryPersonId],
        references: [users.id],
    }),
}));
