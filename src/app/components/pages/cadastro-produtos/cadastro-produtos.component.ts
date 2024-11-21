  import { CommonModule } from '@angular/common';
  import { HttpClient } from '@angular/common/http';
  import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

  import { environment } from '../../../../environments/environment';

  @Component({
    selector: 'app-cadastro-produtos',
    standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule
      
    ],
    templateUrl: './cadastro-produtos.component.html',
    styleUrls: ['./cadastro-produtos.component.css']
  })
  export class CadastroProdutosComponent implements OnInit {

    mensagem: string = '';

    constructor(
      private httpClient : HttpClient
    ){}

    get f(){
      return this.form.controls;
    }


    ngOnInit(): void {
        console.log('on init');
    }

    form = new FormGroup({

      nome: new FormControl('' , [Validators.required , Validators.minLength(2)]),
      preco: new FormControl('', [Validators.required, Validators.min(1)]),
      quantidade: new FormControl('', [Validators.required, Validators.min(1)]),  
      ean: new FormControl('' , [Validators.required, Validators.pattern('^\\d{1,5}$')]),
      
    })

    onSubmit() : void {    
      this.httpClient.post(`${environment.apiProdutos}/produtos`,
        this.form.value, { responseType: 'text' })
        .subscribe({
        next: (data) => {
          this.mensagem = 'Cadastrado com sucesso';          
          this.form.reset();
        },
        error: (e) => {        
        this.mensagem = 'Erro ao atualizar o produto, verifique o EAN digitado';
        
        }
        });
      
    }

    
    


  }
