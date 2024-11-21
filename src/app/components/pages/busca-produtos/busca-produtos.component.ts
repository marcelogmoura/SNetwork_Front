import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-busca-produtos',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,    
    ReactiveFormsModule
  ],
  templateUrl: './busca-produtos.component.html',
  styleUrl: './busca-produtos.component.css'
})
export class BuscaProdutosComponent {

  produtos : any [] = [];
  mensagem : string = '';
  

  constructor(
    private httpClient : HttpClient
  ){}


    formConsulta = new FormGroup({
      ean : new FormControl('', [Validators.required, Validators.pattern('^\\d{1,5}$')]),
    })

    get form(): any {
      return this.formConsulta.controls;
    }

    onSubmit(): void {      
      var ean = this.formConsulta.value.ean;
      
      
      
      this.httpClient.get('http://localhost:8083/api/produtos/ean/' + ean)
        
        .subscribe({
          next: (data) => {            
            this.produtos = [data]; 
          },
          error : (e) => {
            console.log(e.error);
            this.mensagem = 'Esse EAN não consta no sistema.';
            this.produtos = []; 
            
          }
        })
      }

      limpar() {
        this.formConsulta.reset();
        this.produtos = [];
        this.mensagem = '';
      }
}
