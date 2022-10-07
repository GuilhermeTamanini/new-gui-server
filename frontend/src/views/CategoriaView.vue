<script>
  import CategoriasApi from "@/api/categorias.js";
  const categoriasApi = new CategoriasApi();
  export default {
    data() {
      return {
        categoria: {},
        descricao: {},
        categorias: [],
      };
    },
    async created() {
      this.categorias = await categoriasApi.buscarTodasAsCategorias();
    },
    methods: {
      async salvar() {
        if (this.categoria.id) {
          await categoriasApi.atualizarCategoria(this.categoria);
        } else {
          await categoriasApi.adicionarCategoria(this.categoria);
        }
        this.categorias = await categoriasApi.buscarTodasAsCategorias();
        this.categoria = {};
      },
      async excluir(categoria) {
        await categoriasApi.excluirCategoria(categoria.id);
        this.categorias = await categoriasApi.buscarTodasAsCategorias();
      },
      editar(categoria) {
        Object.assign(this.categoria, categoria);
      },
    },
  };
</script>
<template>
  <div class="container">
    <div class="title"></div>
  </div>
  <div class="form-input">
    <input
      type="text"
      placeholder="Nome da categoria"
      v-model="categoria.nome"
    />
    <input type="text" placeholder="descrição" v-model="categoria.descricao" />
    <button @click="salvar">salvar</button>
  </div>
  <div class="list-items">
    <table id="table-editora" class="table table-dark table-striped">
      <thead>
        <tr>
          <th scope="col">Categorias</th>
          <th scope="col">Descrição</th>
          <th scope="col" class="text-center">Excluir</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="categoria in categorias" :key="categoria.id">
          <td>{{ categoria.nome }}</td>
          <td>{{ categoria.descricao }}</td>
          <td class="text-center">
            <button class="btn btn-fff btn-sm" @click="excluir(categoria)">
              Excluir
            </button>
            <button class="btn btn-fff btn-sm" @click="editar(categoria)">
              Editar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style>
  #excluir {
    padding-left: 15px;
  }
  .butcent {
    text-align: center;
  }
</style>
