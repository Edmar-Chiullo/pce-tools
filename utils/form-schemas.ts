import z from "zod";

export const formHighAddressNull = z.object({
  activityID: z.string(),
  activityName: z.string(),
  loadAddress: z.string().min(1, {
    message: "Inserir o endereço.",
  }).max(9, {
    message: "Endereço invalido (ex: PP010010A)."}
  )
})

export const formValAddressProduct = z.object({
  activityID: z.string(),
  activityName: z.string(),
  loadAddress: z.string().min(1, {
    message: "Inserir o código do endereço.",
  }).max(9, {
    message: "Endereço invalido (ex: PP010010A)."}
  ),
  loadProduct: z.string().min(1, {
    message: "Inserir o código do produto.",
  }).max(14, {
    message: "Código invalido (o código precisa ter no máximo 14 dígitos)."}
  )
})

export const formFrctionalQuaren = z.object({
  activityID: z.string(),
  activityName: z.string(),
  loadProduct: z.string().min(1, {
    message: "Inserir o código do produto.",
  }).max(14, {
    message: "Código invalido (o código precisa ter no máximo 14 dígitos)."}
  ),
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
  loadAddress: z.string().min(1, {
    message: "Inserir o código do endereço.",
  }).max(9, {
    message: "Código invalido (o código precisa ter no máximo 14 dígitos)."}
  ),
  loadProduct: z.string().min(1, {
    message: "Inserir o código do produto.",
  }).max(14, {
    message: "Código invalido (o código precisa ter no máximo 14 dígitos)."}
  ),
  loadQuant: z.string().min(2, {
    message: "Inserir a quantidade.",
  }),
   loadValid: z.string().min(8, {
    message: "Inserir a validade (ex: DDMMAAAA).",
  }).max(8, {
      message: "Data inválida (ex: DDMMAAAA).",
  }),
})


