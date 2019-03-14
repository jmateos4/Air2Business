import mongoose, { Schema } from 'mongoose'

const distribuidorSchema = new Schema({
  nombre: {
    type: String
  },
  email: {
    type: String
  },
  direccion: {
    type: String
  },
  telefono: {
    type: String
  },
  pedidos: [{
    type: Schema.ObjectId,
    ref: 'Pedido',
  }],
  productos: [{
    type: Schema.ObjectId,
    ref: 'Producto',
  }],
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

distribuidorSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      nombre: this.nombre,
      email: this.email,
      direccion: this.direccion,
      telefono: this.telefono,
      pedidos: this.pedidos,
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

const model = mongoose.model('Distribuidor', distribuidorSchema)

export const schema = model.schema
export default model
