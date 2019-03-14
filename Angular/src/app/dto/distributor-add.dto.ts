export class DistributorAddDto {
    nombre: string;
    email: string;
    direccion: string;
    telefono: string;

    constructor(n: string, e: string, dir: string, tel: string) {
        this.nombre = n;
        this.email = e;
        this.direccion = dir;
        this.telefono = tel;
    }
}
