import { z } from "zod";
import { phases, phaseStatus } from "./project.interface";

export const zodProjectSchema = z
  .object({
    name: z.string().min(1, "Project name is required"),
    clientName: z.string().min(1, "Client name is required"),
    projectGroup: z.string().uuid().nullable().optional(), // assuming it is an ObjectId in MongoDB, using UUID for validation
    googleSheetLink: z.string().url().nullable().optional(),
    teamId: z.string().uuid().nullable().optional(),
    assignedMembers: z
      .array(z.string().uuid())
      .min(1, "Assigned members are required"),
    phases: z
      .array(
        z.object({
          name: z.enum(phases),
          budget: z.number().nonnegative(),
          members: z.array(z.string().uuid()).optional(),
          deadline: z.date().nullable().optional(),
          status: z.enum([phaseStatus.ACTIVE, phaseStatus.INACTIVE]).optional(),
        })
      )
      .default([]),
    totalBudget: z.number().nonnegative(),
    duration: z.number().nonnegative(),
    description: z.string().min(1, "Description is required"),
    salesName: z.string().min(1, "Sales name is required"),
  })
  .strict();
export const zodProjectUpdateSchema = z
  .object({
    body: z.object({
      name: z.string().min(1, "Project name is required").optional(),
      clientName: z.string().min(1, "Client name is required").optional(),
      projectGroup: z.string().uuid().nullable().optional(), // assuming it is an ObjectId in MongoDB, using UUID for validation
      googleSheetLink: z.string().url().nullable().optional(),
      teamId: z.string().uuid().nullable().optional(),
      assignedMembers: z
        .array(z.string())
        .min(1, "Assigned members are required")
        .optional(),
      phases: z
        .array(
          z.object({
            name: z.enum(phases).optional(),
            budget: z.number().nonnegative().optional(),
            members: z.array(z.string().uuid()).optional(),
            deadline: z.date().nullable().optional(),
            status: z
              .enum([phaseStatus.ACTIVE, phaseStatus.INACTIVE])
              .optional(),
          })
        )
        .default([])
        .optional(),
      totalBudget: z.number().nonnegative().optional(),
      duration: z.number().nonnegative().optional(),
      description: z.string().min(1, "Description is required").optional(),
      salesName: z.string().min(1, "Sales name is required").optional(),
    }),
  })
  .strict();
