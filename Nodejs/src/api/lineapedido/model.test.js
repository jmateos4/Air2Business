import { Lineapedido } from '.'

let lineapedido

beforeEach(async () => {
  lineapedido = await Lineapedido.create({ producto: 'test', cantidad: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = lineapedido.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(lineapedido.id)
    expect(view.producto).toBe(lineapedido.producto)
    expect(view.cantidad).toBe(lineapedido.cantidad)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = lineapedido.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(lineapedido.id)
    expect(view.producto).toBe(lineapedido.producto)
    expect(view.cantidad).toBe(lineapedido.cantidad)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
