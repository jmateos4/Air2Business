import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpRequest, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http';
import { ProductoAddDto } from '../dto/product-add.dto';
import { Distribuidor } from '../interfaces/distribuidor-response.interface';
import { Categoria } from '../interfaces/categoria-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  uploadUrl: string;
  // tslint:disable-next-line:max-line-length
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjODc3OWVmM2IwZmIwMDAyMmZkYmIxZCIsImlhdCI6MTU1MjM4OTczM30.2Y9dda0xi35KUEo_1U4KASLw8Y7DoZrp8F_2Ps77H98';

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:max-line-length
  public upload(files: Set<File>, form: ProductoAddDto): { [key: string]: Observable<number> } {
    // this will be the our resulting map
    this.uploadUrl = `https://infinite-hollows-38239.herokuapp.com/productos?access_token=${this.token}`;
    const status = {};

    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('foto', file, file.name);
      formData.append('nombre', form.nombre);
      formData.append('codReferencia', form.codReferencia);
      formData.append('descripcion', form.descripcion);
      formData.append('dimensiones', form.dimensiones);
      formData.append('distribuidor', form.distribuidor);
      formData.append('categoria', form.categoria);

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', this.uploadUrl, formData, {
        reportProgress: true,
      });

      // create a new progress-subject for every file
      const progress = new Subject<number>();

      // send the http-request and subscribe for progress-updates

      const startTime = new Date().getTime();
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          // calculate the progress percentage

          const percentDone = Math.round((100 * event.loaded) / event.total);
          // pass the percentage into the progress-stream
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {
          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          progress.complete();
        }
      });

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable()
      };
    });

    // return the map of progress.observables
    return status;
  }
}
