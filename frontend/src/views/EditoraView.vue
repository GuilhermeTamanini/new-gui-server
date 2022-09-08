<script>
  import EditorasApi from "@/api/editoras.js";
  const editorasApi = new EditorasApi();
  export default {
    data() {
      return {
        editora: {},
        editoras: [],
      };
    },
    async created() {
      this.editoras = await editorasApi.buscarTodasAsEditoras();
    },
    methods: {
      async salvar() {
        if (this.editora.id) {
          await editorasApi.atualizarEditora(this.editora);
        } else {
          await editorasApi.adicionarEditora(this.editora);
        }
        this.editoras = await editorasApi.buscarTodasAsEditoras();
        this.editora = {};
      },
      async excluir(editora) {
        await editorasApi.excluirEditora(editora.id);
        this.editoras = await editorasApi.buscarTodasAsEditoras();
      },
      editar(editora) {
        Object.assign(this.editora, editora);
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
      placeholder="Nome da editora"
      v-model="editora.nome"
      @keyup.enter="salvar"
    />
    <button @click="salvar">salvar</button>
  </div>
  <div class="list-items">
    <table id="table-editora" class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Editoras</th>
          <th id="excluir-editora" scope="col">Acões</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="editora in editoras" :key="editora.id">
          <td>{{ editora.id }}</td>
          <td>{{ editora.nome }}</td>
          <td>
            <button class="btn btn-fff btn-sm" @click="excluir(editora)">Excluir</button>
            <button class="btn btn-fff btn-sm" @click="editar(editora)">Editar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style>
  .table {
    background-color: white;
  }
  #table-editora {
    text-align: center;
  }
  #excluir-editora {
    padding-left: 50px;
  }
</style>
