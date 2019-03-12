import mongoose, { Schema } from 'mongoose'

const productoSchema = new Schema({
  nombre: {
    type: String
  },
  codReferencia: {
    type: String
  },
  descripcion: {
    type: String
  },
  dimensiones: {
    type: String
  },
  distribuidor: {
    type: Schema.ObjectId,
    ref: 'distribuidor',
  },
  categoria: {
    type: Schema.ObjectId,
    ref: 'categoria',
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

productoSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      nombre: this.nombre,
      codReferencia: this.codReferencia,
      descripcion: this.descripcion,
      dimensiones: this.dimensiones,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Producto', productoSchema)

export const schema = model.schema
export default model
