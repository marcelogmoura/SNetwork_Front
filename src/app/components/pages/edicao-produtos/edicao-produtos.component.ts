import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-edicao-produtos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edicao-produtos.component.html',
  styleUrl: './edicao-produtos.component.css'
})
export class EdicaoProdutosComponent {

  constructor(
    private httpClient : HttpClient,
    private activatedRoute : ActivatedRoute
  ){}

  mensagem : string = '';

  form = new FormGroup({

    id: new FormControl(''),
    nome: new FormControl('', [Validators.required, Validators.minLength(2)]),
    preco: new FormControl('', [Validators.required, Validators.min(1)]),
    quantidade: new FormControl('', [Validators.required, Validators.min(1)]),
    ean: new FormControl('' , [Validators.required, Validators.pattern('^\\d{1,5}$')])

  })

  get f() {
    return this.form.controls;
    }

    ngOnInit(): void {   
      const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
  
      this.httpClient.get(`${environment.apiProdutos}/produtos/${id}`)
        .subscribe({
            next: (data : any) => {
              
              this.form.controls['id'].setValue(data.id);
              this.form.controls['nome'].setValue(data.nome);
              this.form.controls['preco'].setValue(data.preco);
              this.form.controls['quantidade'].setValue(data.quantidade);
              this.form.controls['ean'].setValue(data.ean);
            },
            error : (e) => {
              console.log(e.error);
            }
        });
    }

    onSubmit() : void {
      this.httpClient.put(`${environment.apiProdutos}/produtos/` + this.form.value.id, 
        this.form.value)
        .subscribe({
           next: (data) => {      
        this.mensagem = 'Atualizado com sucesso';
        this.form.reset();
        },
        error: (e) => {
        console.log(e.error);
        this.mensagem = 'Erro ao atualizar o produto.';
        } 
        });
        
    }
  
  }
