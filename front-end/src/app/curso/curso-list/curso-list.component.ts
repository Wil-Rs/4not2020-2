import { Component, OnInit } from '@angular/core';
import { CursoService } from '../curso.service';

@Component({
  selector: 'app-curso-list',
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.scss']
})
export class CursoListComponent implements OnInit {
  
  // Nome da entidade no plural
  cursos: any = []
  // quais colunas serao exibidas na tabela e em qual ordem
  displayedColumns: String[] = ['nome', 'carga_horaria', 'nivel', 'valor', 'editar', 'excluir']

  // injecao de dependencia ou inversao de controle
  constructor(private cursoSrv: CursoService) { }

  async ngOnInit() {
    this.cursos = await this.cursoSrv.listar()
    console.log(this.cursos)
  }

  excluir(id: string){
      if(confirm("Dese excluir?")){
          alert('vai aparar o item de id: ' + id)
      }
  }

}
