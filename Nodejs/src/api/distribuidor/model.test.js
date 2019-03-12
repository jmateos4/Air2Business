import { Distribuidor } from '.'

let distribuidor

beforeEach(async () => {
  distribuidor = await Distribuidor.create({ nombre: 'test', email: 'test', direccion: 'test', telefono: 'test', pedidos: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = distribuidor.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(distribuidor.id)
    expect(view.nombre).toBe(distribuidor.nombre)
    expect(view.email).toBe(distribuidor.email)
    expect(view.direccion).toBe(distribuidor.direccion)
    expect(view.telefono).toBe(distribuidor.telefono)
    expect(view.pedidos).toBe(distribuidor.pedidos)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = distribuidor.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(distribuidor.id)
    expect(view.nombre).toBe(distribuidor.nombre)
    expect(view.email).toBe(distribuidor.email)
    expect(view.direccion).toBe(distribuidor.direccion)
    expect(view.telefono).toBe(distribuidor.telefono)
    expect(view.pedidos).toBe(distribuidor.pedidos)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
