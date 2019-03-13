export class ProductoAddDto {
    nombre: string;
    codReferencia: string;
    descripcion: string;
    dimensiones: string;

    constructor(n: string, c: string, des: string, dim: string) {
        this.nombre = n;
        this.codReferencia = c;
        this.descripcion = des;
        this.dimensiones = dim;
    }
}
