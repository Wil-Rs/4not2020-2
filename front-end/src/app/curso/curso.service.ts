import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private apiServer = environment.apiServer
  private apiUri: string = this.apiServer + 'curso'

  constructor(private http: HttpClient) { }

  listar() {
      return this.http.get(this.apiServer + 'curso').toPromise()
  }

  excluir(id: string){
      // O metodo delete nativo do httpClient nao suporta a passagem de um body para 
      // o back-end
      // return this.http.delete(this.apiServer = 'curso/' + id).toPromise()

      // o metodo this.http.request() pode ser usado com qualquer verbo e aceita a passagem de body
      return this.http.request('DELETE', this.apiUri, {body: {_id: id}}).toPromise()
  }

}
