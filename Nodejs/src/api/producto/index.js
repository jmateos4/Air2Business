import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { token, master } from '../../services/passport'
import { schema } from './model'
export Producto, { schema } from './model'

const router = new Router()
const { nombre, codReferencia, descripcion, dimensiones } = schema.tree

/**
 * @api {post} /productos Create producto
 * @apiName CreateProducto
 * @apiGroup Producto
 * @apiParam nombre Producto's nombre.
 * @apiParam codReferencia Producto's codReferencia.
 * @apiParam descripcion Producto's descripcion.
 * @apiParam dimensiones Producto's dimensiones.
 * @apiSuccess {Object} producto Producto's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Producto not found.
 */
router.post('/',
  token({ required: true }),
  body({ nombre, codReferencia, descripcion, dimensiones }),
  create)

/**
 * @api {get} /productos Retrieve productos
 * @apiName RetrieveProductos
 * @apiGroup Producto
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of productos.
 * @apiSuccess {Object[]} rows List of productos.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /productos/:id Retrieve producto
 * @apiName RetrieveProducto
 * @apiGroup Producto
 * @apiSuccess {Object} producto Producto's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Producto not found.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /productos/:id Update producto
 * @apiName UpdateProducto
 * @apiGroup Producto
 * @apiParam nombre Producto's nombre.
 * @apiParam codReferencia Producto's codReferencia.
 * @apiParam descripcion Producto's descripcion.
 * @apiParam dimensiones Producto's dimensiones.
 * @apiSuccess {Object} producto Producto's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Producto not found.
 */
router.put('/:id',
  token({ required: true }),
  body({ nombre, codReferencia, descripcion, dimensiones }),
  update)

/**
 * @api {delete} /productos/:id Delete producto
 * @apiName DeleteProducto
 * @apiGroup Producto
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Producto not found.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
