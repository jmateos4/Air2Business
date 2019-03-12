import { success, notFound } from '../../services/response/'
import { Pedido } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Pedido.create(body)
    .then((pedido) => pedido.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Pedido.count(query)
    .then(count => Pedido.find(query, select, cursor)
      .then((pedidos) => ({
        count,
        rows: pedidos.map((pedido) => pedido.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Pedido.findById(params.id)
    .then(notFound(res))
    .then((pedido) => pedido ? pedido.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Pedido.findById(params.id)
    .then(notFound(res))
    .then((pedido) => pedido ? Object.assign(pedido, body).save() : null)
    .then((pedido) => pedido ? pedido.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Pedido.findById(params.id)
    .then(notFound(res))
    .then((pedido) => pedido ? pedido.remove() : null)
    .then(success(res, 204))
    .catch(next)
