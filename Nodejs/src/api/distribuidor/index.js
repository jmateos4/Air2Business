import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Distribuidor, { schema } from './model'

const router = new Router()
const { nombre, email, direccion, telefono, pedidos } = schema.tree

/**
 * @api {post} /distribuidores Create distribuidor
 * @apiName CreateDistribuidor
 * @apiGroup Distribuidor
 * @apiParam nombre Distribuidor's nombre.
 * @apiParam email Distribuidor's email.
 * @apiParam direccion Distribuidor's direccion.
 * @apiParam telefono Distribuidor's telefono.
 * @apiParam pedidos Distribuidor's pedidos.
 * @apiSuccess {Object} distribuidor Distribuidor's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Distribuidor not found.
 */
router.post('/',
  body({ nombre, email, direccion, telefono, pedidos }),
  create)

/**
 * @api {get} /distribuidores Retrieve distribuidors
 * @apiName RetrieveDistribuidors
 * @apiGroup Distribuidor
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of distribuidors.
 * @apiSuccess {Object[]} rows List of distribuidors.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /distribuidores/:id Retrieve distribuidor
 * @apiName RetrieveDistribuidor
 * @apiGroup Distribuidor
 * @apiSuccess {Object} distribuidor Distribuidor's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Distribuidor not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /distribuidores/:id Update distribuidor
 * @apiName UpdateDistribuidor
 * @apiGroup Distribuidor
 * @apiParam nombre Distribuidor's nombre.
 * @apiParam email Distribuidor's email.
 * @apiParam direccion Distribuidor's direccion.
 * @apiParam telefono Distribuidor's telefono.
 * @apiParam pedidos Distribuidor's pedidos.
 * @apiSuccess {Object} distribuidor Distribuidor's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Distribuidor not found.
 */
router.put('/:id',
  body({ nombre, email, direccion, telefono, pedidos }),
  update)

/**
 * @api {delete} /distribuidores/:id Delete distribuidor
 * @apiName DeleteDistribuidor
 * @apiGroup Distribuidor
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Distribuidor not found.
 */
router.delete('/:id',
  destroy)

export default router
