import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Lineapedido } from '.'

const app = () => express(apiRoot, routes)

let lineapedido

beforeEach(async () => {
  lineapedido = await Lineapedido.create({})
})

test('POST /lineapedidos 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ producto: 'test', cantidad: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.producto).toEqual('test')
  expect(body.cantidad).toEqual('test')
})

test('GET /lineapedidos 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /lineapedidos/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${lineapedido.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(lineapedido.id)
})

test('GET /lineapedidos/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /lineapedidos/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${lineapedido.id}`)
    .send({ producto: 'test', cantidad: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(lineapedido.id)
  expect(body.producto).toEqual('test')
  expect(body.cantidad).toEqual('test')
})

test('PUT /lineapedidos/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ producto: 'test', cantidad: 'test' })
  expect(status).toBe(404)
})

test('DELETE /lineapedidos/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${lineapedido.id}`)
  expect(status).toBe(204)
})

test('DELETE /lineapedidos/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
