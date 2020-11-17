import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TurmaService } from '../turma.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { from } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from 'src/app/curso/curso.service';
import { ProfessorService } from 'src/app/professor/professor.service';
import { SalaAulaService } from 'src/app/sala-aula/sala-aula.service';

@Component({
  selector: 'app-turma-form',
  templateUrl: './turma-form.component.html',
  styleUrls: ['./turma-form.component.scss']
})
export class TurmaFormComponent implements OnInit {

    // variavel para armazenar os dados do registro
    turma: any = {} //objeto vazio, nome no singular

    title: string = 'Nova turma'

    // variaveis para armazenar as listagens de objetos relacionados
    cursos: any = [] // Vetor vazio, nome no plural
    professores: any = []
    salasAula: any = []

  constructor(
        private turmaSrv: TurmaService, 
        // Services das entidades relacionadas
        private cursoSrv: CursoService,
        private professorSrv: ProfessorService,
        private salaAulaSrv: SalaAulaService,
        private snackBar: MatSnackBar, 
        private location: Location, 
        private actRoute: ActivatedRoute,
    ) { }

  async ngOnInit(){
      // verifica se existe o parametro id no url (rota)
      if( this.actRoute.snapshot.params['id'] ){
          // 1 - acionar o back-end para buscar esse registro
          // e disponibiliza-lo para edicao
          try{
            this.turma = await this.turmaSrv.obterUm( this.actRoute.snapshot.params['id'] )
            // 2 - mudar titulo da pagina
            this.title = 'Editando turma'
            
        }catch(erro){
              console.log(erro)
              this.snackBar.open('ERRO: nao foi possivel carregar dados para edicao', 'X(', {
                  duration: 5000
              })
          }
      }
      // Carrega as listagens das entidades relacionadas
      this.carregarDados()
  }

  async carregarDados() {
    try {

        this.cursos = await this.cursoSrv.listar()
        this.professores = await this.professorSrv.listar()
        this.salasAula = await this.salaAulaSrv.listar()

    }catch(erro){
        console.log(erro)
        this.snackBar.open(`Erro: Não foi possivel carregar todos os dados
            necessario para a página`, 'X(', {
                duration: 5000
            })
    }
  }

  async salvar(form: NgForm){
    if(form.valid){
        
        try{

            // se o turma ja exiestir (caso de edicao), ele ja tera
            // o atributo _id

            if(this.turma._id){
                await this.turmaSrv.atualiza(this.turma) // atualizacao
                this.snackBar.open('Dados ATUALIZADOS com sucesso!!!', 'X', {
                    duration: 5000
                })
                // this.location.back()
            }else{
                // 1 - salvar os dados no back-end
                await this.turmaSrv.novo(this.turma)
                // 2 - dar o feedback para o usuario
                this.snackBar.open('Dados salvos com sucesso!!!', 'X', {
                    duration: 5000
                })
                // 3 - voltar ao componente de listagem
                
            }
            
            this.location.back()
        }
        catch(erro){
            console.log(erro)
            this.snackBar.open('ERRO: nao foi possivel salvar', 'X(', {
                duration: 5000
            })
        }
        
        
    }
  }

  voltar(form: NgForm){
    let result = true
    // from.dirty = formlulario sujo, nao salvo(via codigo)
    // from.touched = o conteudo de algum campo foi alterado (via usuario)
    if(form.dirty && form.touched){
        result = confirm('Há dados não salvos. Deseja realmente voltar??')
    }
    if(result) this.location.back()
  }


}
