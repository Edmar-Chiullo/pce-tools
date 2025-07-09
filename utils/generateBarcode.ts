import JsBarcode from 'jsbarcode'

export function generateBarcode(target: Element | null, code: string) {
  if (!target || !code) return

  JsBarcode(target, code, {
    format: 'CODE128',
    displayValue: true,
    height: 60,
    width: 2,
  })
}
