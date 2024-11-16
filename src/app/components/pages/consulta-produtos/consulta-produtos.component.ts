import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consulta-produtos',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './consulta-produtos.component.html',
  styleUrl: './consulta-produtos.component.css'
})
export class ConsultaProdutosComponent implements OnInit{

  produtos: any[] = [];

  constructor(
    private httpClient: HttpClient
    ) {
    }

  ngOnInit(): void {

    this.httpClient.get(`${environment.apiProdutos}/produtos`)
      .subscribe(
        {
          next : (data) => {
            console.log(data);
            this.produtos = data as any[];
          },
          error : (e) => {
            console.log(e.error);
          }
        }
      )
    
  };


  onDelete(id : string) : void {
    if(confirm ('Excluir ?')){
      this.httpClient.delete(`${environment.apiProdutos}/produtos/${id}` ,
      { responseType : 'text' })
          .subscribe({
            next: (data) => {
              this.ngOnInit();
            },error : (e) => {
              console.log(e.error);
            }
          })
        
    }
  }
}
