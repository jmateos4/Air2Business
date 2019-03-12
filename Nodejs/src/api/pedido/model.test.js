import { Pedido } from '.'

let pedido

beforeEach(async () => {
  pedido = await Pedido.create({ lineaspedido: 'test', distribuidor: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = pedido.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(pedido.id)
    expect(view.lineaspedido).toBe(pedido.lineaspedido)
    expect(view.distribuidor).toBe(pedido.distribuidor)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = pedido.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(pedido.id)
    expect(view.lineaspedido).toBe(pedido.lineaspedido)
    expect(view.distribuidor).toBe(pedido.distribuidor)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
