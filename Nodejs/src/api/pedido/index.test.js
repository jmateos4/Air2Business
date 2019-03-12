import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Pedido } from '.'

const app = () => express(apiRoot, routes)

let pedido

beforeEach(async () => {
  pedido = await Pedido.create({})
})

test('POST /pedidos 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ lineaspedido: 'test', distribuidor: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.lineaspedido).toEqual('test')
  expect(body.distribuidor).toEqual('test')
})

test('GET /pedidos 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /pedidos/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${pedido.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(pedido.id)
})

test('GET /pedidos/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /pedidos/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${pedido.id}`)
    .send({ lineaspedido: 'test', distribuidor: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(pedido.id)
  expect(body.lineaspedido).toEqual('test')
  expect(body.distribuidor).toEqual('test')
})

test('PUT /pedidos/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ lineaspedido: 'test', distribuidor: 'test' })
  expect(status).toBe(404)
})

test('DELETE /pedidos/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${pedido.id}`)
  expect(status).toBe(204)
})

test('DELETE /pedidos/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
