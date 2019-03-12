import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Categoria } from '.'

const app = () => express(apiRoot, routes)

let categoria

beforeEach(async () => {
  categoria = await Categoria.create({})
})

test('POST /categorias 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ nombre: 'test', productos: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.nombre).toEqual('test')
  expect(body.productos).toEqual('test')
})

test('GET /categorias 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /categorias/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${categoria.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(categoria.id)
})

test('GET /categorias/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /categorias/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${categoria.id}`)
    .send({ nombre: 'test', productos: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(categoria.id)
  expect(body.nombre).toEqual('test')
  expect(body.productos).toEqual('test')
})

test('PUT /categorias/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ nombre: 'test', productos: 'test' })
  expect(status).toBe(404)
})

test('DELETE /categorias/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${categoria.id}`)
  expect(status).toBe(204)
})

test('DELETE /categorias/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
