import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ConsultaProdutosComponent } from './components/pages/consulta-produtos/consulta-produtos.component';
import { CadastroProdutosComponent } from './components/pages/cadastro-produtos/cadastro-produtos.component';
import { EdicaoProdutosComponent } from './components/pages/edicao-produtos/edicao-produtos.component';
import { BuscaProdutosComponent } from './components/pages/busca-produtos/busca-produtos.component';

export const routes: Routes = [

    {
        path : 'pages/cadastro-produdos' ,
        component : CadastroProdutosComponent
    },

    {
        path : 'pages/consulta-produdos' ,
        component : ConsultaProdutosComponent
    },

    {
        path : 'pages/edicao-produdos' ,
        component : EdicaoProdutosComponent
    },

    {
        path: 'pages/edicao-produtos',
        component: EdicaoProdutosComponent
    },

    {
        path: 'pages/edicao-produtos/:id',
        component: EdicaoProdutosComponent
    },

    {
        path : 'pages/busca-produdos' ,
        component : BuscaProdutosComponent
    },

    {
        path: '',  
        pathMatch: 'full',
        redirectTo: '/pages/consulta-produdos'
    }

];
