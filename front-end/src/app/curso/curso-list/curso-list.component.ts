import { Component, OnInit } from '@angular/core';
import { CursoService } from '../curso.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  constructor(private cursoSrv: CursoService, private snackBar: MatSnackBar) { }

  async ngOnInit() {
    this.cursos = await this.cursoSrv.listar()
    console.log(this.cursos)
  }

  async excluir(id: string){
      if(confirm("Dese excluir?")){
          try {
              await this.cursoSrv.excluir(id)
              // 1) recarregar os dados da tabela
              this.ngOnInit()
              // 2) Dar feedback para o usuario com mensagem
              this.snackBar.open('Item excluido com sucesso', 'X', {
                  duration: 5000 // 5 segundos
              })
          }
          catch(erro){
            //3) dar o feedback de erro para o 
            this.snackBar.open('ERRO!!: nao foi possivel excluir este item', 'X Que pena', {
                  duration: 5000 // 5 segundos
              })
              console.log(erro)
          }
      }
  }

}
