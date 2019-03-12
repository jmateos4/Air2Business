import { success, notFound } from '../../services/response/'
import { Categoria } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Categoria.create(body)
    .then((categoria) => categoria.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Categoria.count(query)
    .then(count => Categoria.find(query, select, cursor)
      .then((categorias) => ({
        count,
        rows: categorias.map((categoria) => categoria.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Categoria.findById(params.id)
    .then(notFound(res))
    .then((categoria) => categoria ? categoria.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Categoria.findById(params.id)
    .then(notFound(res))
    .then((categoria) => categoria ? Object.assign(categoria, body).save() : null)
    .then((categoria) => categoria ? categoria.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Categoria.findById(params.id)
    .then(notFound(res))
    .then((categoria) => categoria ? categoria.remove() : null)
    .then(success(res, 204))
    .catch(next)
