export class ProductoAddDto {
    nombre: string;
    codReferencia: string;
    descripcion: string;
    dimensiones: string;
    distribuidor: string;
    categoria: string;

    constructor(n: string, c: string, des: string, dim: string, dis: string, cat: string) {
        this.nombre = n;
        this.codReferencia = c;
        this.descripcion = des;
        this.dimensiones = dim;
        this.distribuidor = dis;
        this.categoria = cat;
    }
}
