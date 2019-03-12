import { success, notFound } from '../../services/response/'
import { Distribuidor } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Distribuidor.create(body)
    .then((distribuidor) => distribuidor.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Distribuidor.count(query)
    .then(count => Distribuidor.find(query, select, cursor)
      .then((distribuidors) => ({
        count,
        rows: distribuidors.map((distribuidor) => distribuidor.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Distribuidor.findById(params.id)
    .then(notFound(res))
    .then((distribuidor) => distribuidor ? distribuidor.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Distribuidor.findById(params.id)
    .then(notFound(res))
    .then((distribuidor) => distribuidor ? Object.assign(distribuidor, body).save() : null)
    .then((distribuidor) => distribuidor ? distribuidor.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Distribuidor.findById(params.id)
    .then(notFound(res))
    .then((distribuidor) => distribuidor ? distribuidor.remove() : null)
    .then(success(res, 204))
    .catch(next)
