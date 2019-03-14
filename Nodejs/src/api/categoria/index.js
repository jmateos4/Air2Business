import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { token, master } from '../../services/passport'
import { schema } from './model'
export Categoria, { schema } from './model'

const router = new Router()
const { nombre, productos } = schema.tree

/**
 * @api {post} /categorias Create categoria
 * @apiName CreateCategoria
 * @apiGroup Categoria
 * @apiParam nombre Categoria's nombre.
 * @apiParam productos Categoria's productos.
 * @apiSuccess {Object} categoria Categoria's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Categoria not found.
 */
router.post('/',
  token({ required: true }),
  body({ nombre, productos }),
  create)

/**
 * @api {get} /categorias Retrieve categorias
 * @apiName RetrieveCategorias
 * @apiGroup Categoria
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of categorias.
 * @apiSuccess {Object[]} rows List of categorias.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /categorias/:id Retrieve categoria
 * @apiName RetrieveCategoria
 * @apiGroup Categoria
 * @apiSuccess {Object} categoria Categoria's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Categoria not found.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /categorias/:id Update categoria
 * @apiName UpdateCategoria
 * @apiGroup Categoria
 * @apiParam nombre Categoria's nombre.
 * @apiParam productos Categoria's productos.
 * @apiSuccess {Object} categoria Categoria's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Categoria not found.
 */
router.put('/:id',
  token({ required: true }),
  body({ nombre, productos }),
  update)

/**
 * @api {delete} /categorias/:id Delete categoria
 * @apiName DeleteCategoria
 * @apiGroup Categoria
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Categoria not found.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
