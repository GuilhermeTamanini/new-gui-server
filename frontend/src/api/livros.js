import axios from "axios";
export default class LivrosApi {
  async buscarTodosOsLivros() {
    const response = await axios.get('http://localhost:4000/livros');
    return response.data;
  }
  async buscarLivros(id) {
    const response = await axios.get(`http://localhost:4000/livros/${id}`);
    return response.data;
  }
  async adicionarLivros(livros) {
    const response = await axios.post('http://localhost:4000/livros', livros);
    return response.data;
  }
  async excluirLivros(id) {
    const response = await axios.delete(`http://localhost:4000/livros/${id}`);
    return response.data;
  }
  async atualizarLivros(livros) {
    const response = await axios.put(
      `http://localhost:4000/livros/${livros.id}`,
      livros,
    );
    return response.data;
  }
}