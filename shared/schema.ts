import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const doctors = pgTable("doctors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  qualification: text("qualification").notNull(),
  specialization: text("specialization").notNull(),
  department: text("department").notNull(),
  location: text("location").notNull(),
  patientsServed: integer("patients_served").notNull(),
  isAvailable: boolean("is_available").notNull().default(true),
  imageUrl: text("image_url"),
});

export const departments = pgTable("departments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  doctorCount: integer("doctor_count").notNull().default(0),
});

export const insertDoctorSchema = createInsertSchema(doctors).omit({
  id: true,
});

export const insertDepartmentSchema = createInsertSchema(departments).omit({
  id: true,
});

export type InsertDoctor = z.infer<typeof insertDoctorSchema>;
export type Doctor = typeof doctors.$inferSelect;
export type InsertDepartment = z.infer<typeof insertDepartmentSchema>;
export type Department = typeof departments.$inferSelect;

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
