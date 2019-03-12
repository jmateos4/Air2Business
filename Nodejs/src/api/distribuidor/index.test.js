import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Distribuidor } from '.'

const app = () => express(apiRoot, routes)

let distribuidor

beforeEach(async () => {
  distribuidor = await Distribuidor.create({})
})

test('POST /distribuidores 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ nombre: 'test', email: 'test', direccion: 'test', telefono: 'test', pedidos: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.nombre).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.direccion).toEqual('test')
  expect(body.telefono).toEqual('test')
  expect(body.pedidos).toEqual('test')
})

test('GET /distribuidores 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /distribuidores/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${distribuidor.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(distribuidor.id)
})

test('GET /distribuidores/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /distribuidores/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${distribuidor.id}`)
    .send({ nombre: 'test', email: 'test', direccion: 'test', telefono: 'test', pedidos: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(distribuidor.id)
  expect(body.nombre).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.direccion).toEqual('test')
  expect(body.telefono).toEqual('test')
  expect(body.pedidos).toEqual('test')
})

test('PUT /distribuidores/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ nombre: 'test', email: 'test', direccion: 'test', telefono: 'test', pedidos: 'test' })
  expect(status).toBe(404)
})

test('DELETE /distribuidores/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${distribuidor.id}`)
  expect(status).toBe(204)
})

test('DELETE /distribuidores/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
