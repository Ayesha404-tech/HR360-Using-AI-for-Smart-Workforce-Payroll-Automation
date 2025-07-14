import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import bcrypt from "bcryptjs";

export const getUsers = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const getUserById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

export const createUser = mutation({
  args: {
    email: v.string(),
    password: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    role: v.union(v.literal("admin"), v.literal("hr"), v.literal("employee"), v.literal("candidate")),
    department: v.optional(v.string()),
    position: v.optional(v.string()),
    salary: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const passwordHash = await bcrypt.hash(args.password, 10);
    
    return await ctx.db.insert("users", {
      email: args.email,
      passwordHash,
      firstName: args.firstName,
      lastName: args.lastName,
      role: args.role,
      department: args.department,
      position: args.position,
      salary: args.salary,
      joinDate: new Date().toISOString().split('T')[0],
      isActive: true,
    });
  },
});

export const updateUser = mutation({
  args: {
    userId: v.id("users"),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    role: v.optional(v.union(v.literal("admin"), v.literal("hr"), v.literal("employee"), v.literal("candidate"))),
    department: v.optional(v.string()),
    position: v.optional(v.string()),
    salary: v.optional(v.number()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { userId, ...updates } = args;
    return await ctx.db.patch(userId, updates);
  },
});

export const deleteUser = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.userId);
  },
});