export class DistributorAddDto {
    nombre: string;
    email: string;
    direccion: string;
    telefono: string;
    distribuidor: string;
    categoria: string;

    constructor(n: string, e: string, dir: string, tel: string, dis: string, cat: string) {
        this.nombre = n;
        this.email = e;
        this.direccion = dir;
        this.telefono = tel;
        this.distribuidor = dis;
        this.categoria = cat;
    }
}
