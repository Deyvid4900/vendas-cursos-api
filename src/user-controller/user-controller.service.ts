import { Usuarios } from './../models/usuarios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppServiceUser {
  constructor(
    @InjectRepository(Usuarios)
    private UsuariosRepositorio: Repository<Usuarios>,
  ) {}

  public listarTodos(): Promise<Usuarios[]> {
    return this.UsuariosRepositorio.find();
  }
  public listarTodos10(): Promise<Usuarios[]> {
    return this.UsuariosRepositorio.query(
      'SELECT * FROM Usuarios order by rand() LIMIT 10',
    );
  }
  public listar10MelhoresUsuarios(): Promise<Usuarios[]> {
    return this.UsuariosRepositorio.query(
      `
      SELECT *
FROM (
    SELECT *
    FROM cursos
    WHERE mediapontuacao > 6
    ORDER BY RAND()
    LIMIT 10
) AS subquery
ORDER BY  mediaPontuacao desc;

      `,
    );
  }

  public async buscarPorId(idCliente: number): Promise<Usuarios> {
    const curso = await this.UsuariosRepositorio.findOneBy({ idCliente });

    //Verifica se o cliente existe no banco de dados
    if (!curso) {
      throw new NotFoundException('produto não econtrado');
    }

    return curso;
  }

  public async buscarPorCategoriaQuantidade(cat: string): Promise<number> {
    const cursos = await this.UsuariosRepositorio.query(
      'SELECT COUNT(*) as QuantidadeCategoria FROM cursos WHERE categoriaCurso = "' +
        cat +
        '"',
    );
    return cursos;
  }

  public async buscar5Categorias(): Promise<Usuarios[]> {
    const cursos = await this.UsuariosRepositorio
      .query(`SELECT id, categoriaCurso
FROM (
    SELECT id, categoriaCurso
    FROM cursos
    GROUP BY categoriaCurso  
) AS subquery
ORDER BY RAND()
LIMIT 5;
`);

    if (!cursos || cursos.length === 0) {
      throw new NotFoundException('Nenhum produto encontrado');
    }

    return cursos; // Retorna o array de cursos
  }

  public async buscarCategorias(idCliente: number): Promise<Usuarios[]> {
    const cursos = await this.UsuariosRepositorio.findBy({ idCliente });

    if (!cursos || cursos.length === 0) {
      throw new NotFoundException('Nenhum produto encontrado');
    }

    return cursos; // Retorna o array de cursos
  }

  public async salvar(usuarios: Usuarios): Promise<Usuarios> {
    const novoUsuario = await this.UsuariosRepositorio.save(usuarios);
    return novoUsuario;
  }

  public async atualizar(
    idCliente: number,
    usuarios: Usuarios,
  ): Promise<Usuarios> {
    const editCurso = await this.UsuariosRepositorio.findOneBy({ idCliente });

    //Verifica se o produto existe no banco de dados
    if (!editCurso) {
      throw new NotFoundException('produto não econtrado');
    }

    //Salva as alterações
    await this.UsuariosRepositorio.save(editCurso);

    //Retorna o registro alterado
    return editCurso;
  }

  public async excluir(id: number): Promise<void> {
    await this.UsuariosRepositorio.delete(id);
  }
}
