import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "hr360-secret-key";

export const login = mutation({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await bcrypt.compare(args.password, user.passwordHash);
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        department: user.department,
        position: user.position,
        joinDate: user.joinDate,
        salary: user.salary,
        isActive: user.isActive,
      },
    };
  },
});

export const register = mutation({
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
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingUser) {
      throw new Error("User already exists");
    }

    const passwordHash = await bcrypt.hash(args.password, 10);

    const userId = await ctx.db.insert("users", {
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

    return { success: true, userId };
  },
});

export const verifyToken = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    try {
      const decoded = jwt.verify(args.token, JWT_SECRET) as any;
      const user = await ctx.db.get(decoded.userId);
      
      if (!user) {
        throw new Error("User not found");
      }

      return {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        department: user.department,
        position: user.position,
        joinDate: user.joinDate,
        salary: user.salary,
        isActive: user.isActive,
      };
    } catch (error) {
      throw new Error("Invalid token");
    }
  },
});