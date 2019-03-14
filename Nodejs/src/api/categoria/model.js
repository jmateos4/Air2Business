import mongoose, { Schema } from 'mongoose'

const categoriaSchema = new Schema({
  nombre: {
    type: String
  },
  productos: [{
    type: Schema.ObjectId,
    ref: 'Producto',
  }]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

categoriaSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      nombre: this.nombre,
      productos: this.productos,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Categoria', categoriaSchema)

export const schema = model.schema
export default model
