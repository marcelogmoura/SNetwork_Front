import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-consulta-produtos',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgxPaginationModule
    
    
],
  templateUrl: './consulta-produtos.component.html',
  styleUrl: './consulta-produtos.component.css'
})
export class ConsultaProdutosComponent implements OnInit{

  produtos: any[] = [];
  pagina: number = 1;

  constructor(
    private httpClient: HttpClient,
    private spinnerService : NgxSpinnerService
    ) {
    }

  ngOnInit(): void {

    this.spinnerService.show();

    this.httpClient.get(`${environment.apiProdutos}/produtos`)
      .subscribe(
        {
          next : (data) => {
            console.log(data);
            this.produtos = data as any[];

            this.spinnerService.hide();
          },
          error : (e) => {
            console.log(e.error);
          }
        }
      )
    
  };


  onDelete(id : string) : void {

    
    if(confirm ('Excluir ?')){

      this.spinnerService.show();

      this.httpClient.delete(`${environment.apiProdutos}/produtos/${id}` ,
      { responseType : 'text' })
          .subscribe({
            next: (data) => {
              this.ngOnInit();

              this.spinnerService.hide();
            },error : (e) => {
              console.log(e.error);
            }
          })
        
    }
  }

  handlePageChange(event: any) {
    this.pagina = event;
    }
}
