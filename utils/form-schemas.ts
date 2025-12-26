import { ActivityData } from "@/app/type/type";
import z from "zod";

const validSectors = ["PP", "FR", "TP", "FB", "BL", "CF"]
const validMaster = ["PL", "WISPL"]
const validSides = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "N", "O", "P", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "N", "O", "P", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "/", "(", ")", ".", ","]

export const formHighAddressNull = z.object({
  activityID: z.string(),
  activityName: z.string(),
  loadAddress: z.string()
  .min(1, {
    message: "Inserir endereço.",
  }).max(14, {
      message: "Endereço inválido.",
  })
  .refine((val) => {
    const sector = val.slice(0, 2)
    const street = Number(val.slice(2, 4))
    const block = Number(val.slice(4, 7))
    const floor = Number(val.slice(7, 8))
    const side = val.slice(8, 9)

    return (
      validSectors.includes(sector) &&
      street >= 0 && street <= 52 &&
      block >= 0 && block <= 260 &&
      floor >= 0 && floor <= 5 &&
      validSides.includes(side)
    )
  }, "Endereço inválido (ex: PP010010A)"),  
})

export const formValidMaster = z.object({
  activityID: z.string(),
  activityName: z.string(),
  validMaster: z.string()
  .min(1, {
    message: "Lei o master.",
  }).max(14, {
      message: "Código inválido.",
  })
  .refine((val) => {
    const sector = val.slice(0, 2)
    return (
      validMaster.includes(sector)
    )
  }, "Valor inválido (ex: PL010010A)"),  
})


export const formValAddressProduct = z.object({
  activityID: z.string(),
  activityName: z.string(),
  loadAddress: z.string()
  .min(1, {
    message: "Inserir endereço.",
  }).max(14, {
      message: "Endereço inválido.",
  })
  .refine((val) => {
    const sector = val.slice(0, 2)
    const street = Number(val.slice(2, 4))
    const block = Number(val.slice(4, 7))
    const floor = Number(val.slice(7, 8))
    const side = val.slice(8, 9)

    return (
      validSectors.includes(sector) &&
      street >= 0 && street <= 52 &&
      block >= 0 && block <= 260 &&
      floor >= 0 && floor <= 5 &&
      validSides.includes(side)
    )
  }, "Endereço inválido (ex: PP010010A)"),
  
  loadProduct: z.string()
  .min(1, {
    message: "Inserir a código do produto.",
  }).max(50, {
      message: "Código inválido.",
  })
  .refine((cod) => {
    return !cod.split('').some(char => chars.includes(char.toLocaleUpperCase()));
  }, "Código inválido"),
})

export const formFrctionalQuaren = z.object({
  activityID: z.string(),
  activityName: z.string(),
  loadProduct: z.string()
  .min(1, {
    message: "Inserir código.",
  }).max(14, {
      message: "Inserir a código do produto.",
  })
  .refine((cod) => {
    if (cod.length > 14) return false
    return !cod.split('').some(char => chars.includes(char.toLocaleUpperCase()));
  }, "Código inválido"),

  loadQuant: z.string().min(2, {
    message: "Inserir a quantidade.",
  }),

   loadValid: z.string().min(8, {
    message: "Inserir a validade (ex: DDMMAAAA).",
  }).max(8, {
      message: "Data inválida (ex: DDMMAAAA).",
  }),
})

export const formPickingRotation = z.object({
  activityID: z.string(),
  activityName: z.string(),
  loadAddress: z.string().refine((val) => {
    if (val.length !== 9) return false
    const sector = val.slice(0, 2)
    const street = Number(val.slice(2, 4))
    const block = Number(val.slice(4, 7))
    const floor = Number(val.slice(7, 8))
    const side = val.slice(8, 9)

    return (
      validSectors.includes(sector) &&
      street >= 0 && street <= 52 &&
      block >= 0 && block <= 260 &&
      floor >= 0 && floor <= 5 &&
      validSides.includes(side)
    )
  }, "Endereço inválido (ex: PP010010A)"),

  loadProduct: z.string()
  .min(1, {
    message: "Inserir a código do produto.",
  }).max(14, {
      message: "Código inválido.",
  })
  .refine((cod) => {
    return !cod.split('').some(char => chars.includes(char.toLocaleUpperCase()));
  }, "Código inválido"),

  loadQuant: z.string().min(2, {
    message: "Inserir a quantidade.",
  }),
  
   loadValid: z.string().min(8, {
    message: "Inserir a validade (ex: DDMMAAAA).",
  }).max(8, {
      message: "Data inválida (ex: DDMMAAAA).",
  }),
})