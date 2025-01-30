import { z } from 'zod'
import { zfd } from 'zod-form-data'
import { coreMessageSchema } from 'ai'

/**
 * Common schemas
 */
export const postPromptInputSchema = z.object({
  prompt: z.string(),
})
export type PostPromptInput = z.infer<typeof postPromptInputSchema>

/**
 * Counter route
 */
export const postCounterInputSchema = z.object({
  messages: coreMessageSchema.array(),
})
export type PostCounterInput = z.infer<typeof postCounterInputSchema>

/**
 * Recipe route
 */
export const postRecipeOutputSchema = z.object({
  recipe: z.object({
    name: z.string().describe('The title of the recipe'),
    ingredients: z
      .array(
        z.object({
          name: z.string(),
          amount: z.string(),
        }),
      )
      .describe('The ingredients needed for the recipe'),
    steps: z.array(z.string()).describe('The steps to make the recipe'),
  }),
})
export type PostRecipeOutput = z.infer<typeof postRecipeOutputSchema>

/**
 * File route
 */
export const postFileInputSchema = zfd.formData({
  file: zfd.file(),
})
export type PostFileInput = z.infer<typeof postFileInputSchema>

export const postFileOutputSchema = z
  .object({
    title: z.string().optional().describe('The title of the file.'),
    mimeType: z.string().optional().describe('The MIME type of the file.'),
    description: z
      .string()
      .optional()
      .describe('A short description of the file.'),
    author: z.string().optional().describe('The author of the file.'),
    date: z.string().optional().describe('The date the file was created.'),
    content: z.string().optional().describe('The content of the file.'),
    numericalData: z
      .object({
        details: z
          .array(
            z.object({
              name: z
                .string()
                .optional()
                .describe('name of the recognized entity'),
              quantity: z
                .number()
                .optional()
                .describe('quantity of the recognized entity'),
              unit: z
                .string()
                .optional()
                .describe('unit of the recognized entity'),
              unitPrice: z
                .number()
                .optional()
                .describe('unit price of the recognized entity'),
              taxAmount: z
                .number()
                .optional()
                .describe('tax amount of the recognized entity'),
              totalAmount: z
                .number()
                .optional()
                .describe('total value of the recognized entity'),
            }),
          )
          .optional()
          .describe('The extracted quantities.'),
        totals: z
          .object({
            total: z
              .number()
              .optional()
              .describe('The total value of the numerical data.'),
            tax: z
              .number()
              .optional()
              .describe('The total tax value of the numerical data.'),
            totalWithTax: z
              .number()
              .optional()
              .describe('The total value with tax of the numerical data.'),
          })
          .optional()
          .describe('The totals of the extracted quantities.'),
      })
      .optional()
      .describe(
        'If the file contains numerical data, this field will contain the extracted quantities.',
      ),
  })
  .passthrough()
  .describe(
    'Describe the file. Include some relevant information about the file.',
  )

export type PostFileOutput = z.infer<typeof postFileOutputSchema>
