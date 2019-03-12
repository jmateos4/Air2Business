import { success, notFound } from '../../services/response/'
import { Producto } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Producto.create(body)
    .then((producto) => producto.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Producto.count(query)
    .then(count => Producto.find(query, select, cursor)
      .then((productos) => ({
        count,
        rows: productos.map((producto) => producto.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Producto.findById(params.id)
    .then(notFound(res))
    .then((producto) => producto ? producto.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Producto.findById(params.id)
    .then(notFound(res))
    .then((producto) => producto ? Object.assign(producto, body).save() : null)
    .then((producto) => producto ? producto.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Producto.findById(params.id)
    .then(notFound(res))
    .then((producto) => producto ? producto.remove() : null)
    .then(success(res, 204))
    .catch(next)
