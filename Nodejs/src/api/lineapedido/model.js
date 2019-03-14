import mongoose, { Schema } from 'mongoose'

const lineapedidoSchema = new Schema({
  producto: {
      type: Schema.ObjectId,
      ref: 'Producto',
  },
  cantidad: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

lineapedidoSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      producto: this.producto,
      cantidad: this.cantidad,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Lineapedido', lineapedidoSchema)

export const schema = model.schema
export default model
