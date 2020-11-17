import { Component, OnInit } from '@angular/core';
import { TurmaService } from '../turma.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-turma-list',
  templateUrl: './turma-list.component.html',
  styleUrls: ['./turma-list.component.scss']
})
export class TurmaListComponent implements OnInit {
  
  // Nome da entidade no plural
  turmas: any = []
  // quais colunas serao exibidas na tabela e em qual ordem
  displayedColumns: String[] = ['nome', 'curso', 'professor', 'dias_semana', 'horario', 'editar', 'excluir']

  // injecao de dependencia ou inversao de controle
  constructor(private turmaSrv: TurmaService, private snackBar: MatSnackBar) { }

  async ngOnInit() {
    this.turmas = await this.turmaSrv.listar()
    console.log(this.turmas)
  }

  async excluir(id: string){
      if(confirm("Dese excluir?")){
          try {
              await this.turmaSrv.excluir(id)
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
