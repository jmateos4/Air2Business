import { success, notFound } from '../../services/response/'
import { Pedido } from '.'
import { User } from '../user'
import { Producto } from  '../producto'
import { Lineapedido } from '../lineapedido'
import { Distribuidor } from '../distribuidor'



// Creación de pedido tocho

export const create = async({ idProducto:string, cantidad: number, bodymen: { body } }, res, next) => {
  var lineapedidoC;
  var pedidoC;
  var distribuidorProducto;

  await Lineapedido.create(idProducto, cantidad)
    .then((lineapedido) =>{
      lineapedidoC = lineapedido
      lineapedido.view(true)
    })
    .then(success(res, 201))
    .catch(next)

  await Producto.findById (lineapedidoC.Producto.id)
  
    .then((Producto) =>{
      distribuidorProducto = Producto.distribuidor;
    })
    .catch(next)
  
  await Distribuidor.findById(distribuidorProducto)
  .then((distribuidor) => {
    
     for (i = 0; i < distribuidor.pedidos.length; i++) {
            if (distribuidor.pedidos[i] == 0 || distribuidor.pedidos[i].estadopedido == 'completado') {
              Pedido.create(body)
              .then((pedido) => {
                pedido.lineapedidos.pedido[i].push(lineapedidoC)
                pedido.view(true)
                .then(success(res, 201))
                .catch(next) 
              })
            } else if (distribuidor.pedidos[i] != 0 || distribuidor.pedidos[i].estadopedido != 'completado'){
              Pedido.findById(distribuidor.pedidos[i])
              .then((pedido)=> {
                pedido.lineapedidos.pedido[i].push(lineapedidoC)
                return pedido.save()
              })
              .then(success(res, 201))
              .catch(next)
            }
          }
  })
  .catch(next)
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

