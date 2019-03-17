import { success, notFound } from '../../services/response/'
import { Pedido } from '.'
import { User } from '../user'
import { Producto } from  '../producto'
import { Lineapedido } from '../lineapedido'

/*export const create = ({ bodymen: { body } }, res, next) =>
  Pedido.create(body)
    .then((pedido) => pedido.view(true))
    .then(success(res, 201))
    .catch(next)
*/

// Creación de pedido tocho

export const create = async({ bodymen: { body } }, res, next) => {
 var pedidoC;
  await Pedido.create(body)
 .then((pedido)=> {
   if (pedido.estado === 'completado' || pedido.lineaspedido[length] === 0) {
      Distribuidor.findById(pedido.view(true).distribuidor)
      .then ((distribuidor) => {
        pedido.distribuidor = distribuidor.id;
      })
      Empresa.findById(pedido.view(true).empresa)
      .then ((empresa) => {
        pedido.empresa = empresa.id;
        
      })
      .then(success(res, 201))
      .catch(next)
   } else {

   }
 })
}

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
