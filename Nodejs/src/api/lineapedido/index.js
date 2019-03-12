import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Lineapedido, { schema } from './model'

const router = new Router()
const { producto, cantidad } = schema.tree

/**
 * @api {post} /lineapedidos Create lineapedido
 * @apiName CreateLineapedido
 * @apiGroup Lineapedido
 * @apiParam producto Lineapedido's producto.
 * @apiParam cantidad Lineapedido's cantidad.
 * @apiSuccess {Object} lineapedido Lineapedido's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Lineapedido not found.
 */
router.post('/',
  body({ producto, cantidad }),
  create)

/**
 * @api {get} /lineapedidos Retrieve lineapedidos
 * @apiName RetrieveLineapedidos
 * @apiGroup Lineapedido
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of lineapedidos.
 * @apiSuccess {Object[]} rows List of lineapedidos.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /lineapedidos/:id Retrieve lineapedido
 * @apiName RetrieveLineapedido
 * @apiGroup Lineapedido
 * @apiSuccess {Object} lineapedido Lineapedido's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Lineapedido not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /lineapedidos/:id Update lineapedido
 * @apiName UpdateLineapedido
 * @apiGroup Lineapedido
 * @apiParam producto Lineapedido's producto.
 * @apiParam cantidad Lineapedido's cantidad.
 * @apiSuccess {Object} lineapedido Lineapedido's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Lineapedido not found.
 */
router.put('/:id',
  body({ producto, cantidad }),
  update)

/**
 * @api {delete} /lineapedidos/:id Delete lineapedido
 * @apiName DeleteLineapedido
 * @apiGroup Lineapedido
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Lineapedido not found.
 */
router.delete('/:id',
  destroy)

export default router
