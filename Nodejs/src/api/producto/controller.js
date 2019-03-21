import { success, notFound } from '../../services/response/'
import { Producto } from '.'
import { Distribuidor } from '../distribuidor'
import { Categoria} from '../categoria'

const uploadService = require('../../services/upload/')

/*export const create = ({ bodymen: { body } }, res, next) =>
  Producto.create(body)
    .then((producto) => producto.view(true))
    .then(success(res, 201))
    .catch(next)
*/

    export const create = (req, res, next) => {
      let productoCreado;
    
      uploadService.uploadFromBinary(req.file.buffer)
      .then((json) =>     
        Producto.create({
          nombre: req.body.nombre,
          codReferencia: req.body.codReferencia,
          descripcion: req.body.descripcion,
          dimensiones: req.body.dimensiones,
          distribuidor: req.body.distribuidor,
          categoria: req.body.categoria,
          foto: json.data.link
        })
      )
      .then((producto) => {
        productoCreado = producto;
        Categoria.findByIdAndUpdate(producto.categoria, { $push: {productos: producto}}).exec()
        return Distribuidor.findByIdAndUpdate(producto.distribuidor, { $push: {productos: producto}}).exec()
      })
    .then((distribuidor) => productoCreado.view(true))
      .then(success(res, 201))
      .catch(err => {
        console.log(err)
        next(err)
      })
    }


export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Producto.count(query)
    .then(count => Producto.find(query, select, cursor)
    .populate('distribuidor', 'id nombre')
    .populate('categoria', 'id nombre')
      .then((productos) => ({
        count,
        rows: productos.map((producto) => producto.view(true))
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Producto.findById(params.id)
    .populate('distribuidor', 'id nombre')
    .populate('categoria', 'id nombre')
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
