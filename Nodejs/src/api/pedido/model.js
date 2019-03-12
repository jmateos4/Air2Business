import mongoose, { Schema } from 'mongoose'

const pedidoSchema = new Schema({
  lineaspedido: [{
      type: Schema.ObjectId,
      ref: 'pedido'
  }],
  distribuidor: {
      type: Schema.ObjectId,
      ref: 'distribuidor',
  },
  empresa: {
    type: Schema.ObjectId,
    ref: 'user',
}
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

pedidoSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      lineaspedido: this.lineaspedido,
      distribuidor: this.distribuidor,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Pedido', pedidoSchema)

export const schema = model.schema
export default model
