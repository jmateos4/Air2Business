import { success, notFound } from '../../services/response/'
import { Lineapedido } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Lineapedido.create(body)
    .then((lineapedido) => lineapedido.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Lineapedido.count(query)
    .then(count => Lineapedido.find(query, select, cursor)
      .then((lineapedidos) => ({
        count,
        rows: lineapedidos.map((lineapedido) => lineapedido.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Lineapedido.findById(params.id)
    .then(notFound(res))
    .then((lineapedido) => lineapedido ? lineapedido.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Lineapedido.findById(params.id)
    .then(notFound(res))
    .then((lineapedido) => lineapedido ? Object.assign(lineapedido, body).save() : null)
    .then((lineapedido) => lineapedido ? lineapedido.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Lineapedido.findById(params.id)
    .then(notFound(res))
    .then((lineapedido) => lineapedido ? lineapedido.remove() : null)
    .then(success(res, 204))
    .catch(next)
