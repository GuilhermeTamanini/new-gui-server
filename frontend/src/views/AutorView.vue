<script>
import AutoresApi from "@/api/autores.js";
const autoresApi = new AutoresApi();
export default {
  data() {
    return {
      autor: {},
      descricao: {},
      autores: [],
    };
  },
  async created() {
    this.autores = await autoresApi.buscarTodosOsAutores();
  },
  methods: {
    async salvar() {
      if (this.autor.id) {
        await autoresApi.atualizarAutores(this.autor);
      } else {
        await autoresApi.adicionarAutores(this.autor);
      }
      this.autores = await autoresApi.buscarTodosOsAutores();
      this.autor = {};
    },
    async excluir(autor) {
      await autoresApi.excluirAutores(autor.id);
      this.autores = await autoresApi.buscarTodosOsAutores();
    },
    editar(autor) {
      Object.assign(this.autor, autor);
    },
  },
};
</script>
<template>
  <div class="container">
    <div class="title"></div>
  </div>
  <div class="form-input">
    <input type="text" placeholder="Nome do autor" v-model="autor.nome" />
    <input type="text" placeholder="Descrição" v-model="autor.descricao">
    <button @click="salvar">salvar</button>
  </div>
  <div class="list-items">
    <table id="table-editora" class="table table-striped">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nome</th>
          <th scope="col">Descrição</th>
          <th id="excluir-editora" scope="col">Acões</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="autor in autores" :key="autor.id">
          <td>{{ autor.id }}</td>
          <td>{{ autor.nome }}</td>
          <td>{{ autor.descricao }}</td>
          <td>
            <button class="btn btn-fff btn-sm" @click="excluir(autor)">Excluir</button>
            <button class="btn btn-fff btn-sm" @click="editar(autor)">Editar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style>
  
</style>