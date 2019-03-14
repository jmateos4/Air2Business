import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from '../session/sessionmodule.service';
import { Observable } from 'rxjs';
import {CategoriaContainer} from '../interfaces/categoria-container.interface';
import {Categoria} from '../interfaces/categoria-response.interface';
import { CategoryAddDto } from '../dto/category-add.dto';
import {ProductoContainer} from '../interfaces/producto-container.interface';
import {Producto} from '../interfaces/producto-response.interface';
import { ProductoAddDto} from '../dto/product-add.dto';
import { DistribuidorContainer } from '../interfaces/distribuidor-container.interface';
import { Distribuidor } from '../interfaces/distribuidor-response.interface';
import { DistributorAddDto } from '../dto/distributor-add.dto';





const url = `${environment.apiUrl}/productos`;
const url2 = `${environment.apiUrl}/categorias`;
const url3 = `${environment.apiUrl}/distribuidores`;



@Injectable({
  providedIn: 'root'
})
export class DashboardmoduleService {

  token = `?access_token=${this.sessionService.getToken()}`;
  master = `?access_token=${environment.masterKeyNoAcc}`;
  constructor(private http: HttpClient, private sessionService: SessionService) {}


  // Productos

  getAllProducts(): Observable<ProductoContainer> {
    return this.http.get<ProductoContainer>(`${url}/${this.token}`);
}

  createProduct(productCreateDto: ProductoAddDto): Observable<Producto> {
    return this.http.post<Producto>(`${url}/${this.token}`, productCreateDto);
}

  updateProduct(id: string, resource: ProductoAddDto): Observable<Producto> {
    return this.http.put<Producto>(`${url}/${id}${this.token}`, resource);
}

  deleteProduct(id: string): Observable<Producto> {
    return this.http.delete<Producto>(`${url}/${id}${this.token}`);
}


  // Categorias
  getAllCategories(): Observable<CategoriaContainer> {
    return this.http.get<CategoriaContainer>(`${url2}/${this.token}`);
}

  createCategory(categoryCreateDto: CategoryAddDto): Observable<Categoria> {
    return this.http.post<Categoria>(`${url2}/${this.token}`, categoryCreateDto);
}

  updateCategory(id: string, resource: CategoryAddDto): Observable<Categoria> {
    return this.http.put<Categoria>(`${url2}/${id}${this.token}`, resource);
}

  deleteCategory(id: string): Observable<Categoria> {
    return this.http.delete<Categoria>(`${url2}/${id}${this.token}`);
}


  // Distribuidor
  getAllDistributors(): Observable<DistribuidorContainer> {
    return this.http.get<DistribuidorContainer>(`${url3}/${this.token}`);
}

  createDistributor(distribudorAddDto: DistributorAddDto): Observable<Distribuidor> {
    return this.http.post<Distribuidor>(`${url3}/${this.token}`, distribudorAddDto);
}

  updateDistributor(id: string, resource: DistributorAddDto): Observable<Distribuidor> {
    return this.http.put<Distribuidor>(`${url3}/${id}${this.token}`, resource);
}

  deleteDistributor(id: string): Observable<Distribuidor> {
    return this.http.delete<Distribuidor>(`${url3}/${id}${this.token}`);
}








}
