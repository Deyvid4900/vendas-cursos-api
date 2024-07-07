import { Injectable, NotFoundException } from '@nestjs/common';
import { Cursos } from './models/cursos';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Cursos)
    private cursoRepositorio: Repository<Cursos>,
  ) {}

  public listarTodos(): Promise<Cursos[]> {
    return this.cursoRepositorio.find();
  }
  public listarTodos10(): Promise<Cursos[]> {
    return this.cursoRepositorio.query(
      'SELECT * FROM cursos order by rand() LIMIT 10',
    );
  }
  public listar10MelhoresCursos(): Promise<Cursos[]> {
    return this.cursoRepositorio.query(
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

  public async buscarPorId(id: number): Promise<Cursos> {
    const curso = await this.cursoRepositorio.findOneBy({ id });

    //Verifica se o cliente existe no banco de dados
    if (!curso) {
      throw new NotFoundException('produto não econtrado');
    }

    return curso;
  }

  public async buscarPorCategoriaQuantidade(cat: string): Promise<number> {
    const cursos = await this.cursoRepositorio.query(
      'SELECT COUNT(*) as QuantidadeCategoria FROM cursos WHERE categoriaCurso = "' +
        cat +
        '"',
    );
    return cursos;
  }

  public async buscar5Categorias(): Promise<Cursos[]> {
    const cursos = await this.cursoRepositorio.query(`SELECT id, categoriaCurso
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

  public async buscarCategorias(categoriaCurso: string): Promise<Cursos[]> {
    const cursos = await this.cursoRepositorio.findBy({ categoriaCurso });

    if (!cursos || cursos.length === 0) {
      throw new NotFoundException('Nenhum produto encontrado');
    }

    return cursos; // Retorna o array de cursos
  }

  public async salvar(curso: Cursos): Promise<Cursos> {
    const novoCurso = await this.cursoRepositorio.save(curso);
    return novoCurso;
  }

  public async atualizar(id: number, curso: Cursos): Promise<Cursos> {
    const editCurso = await this.cursoRepositorio.findOneBy({ id });

    //Verifica se o produto existe no banco de dados
    if (!editCurso) {
      throw new NotFoundException('produto não econtrado');
    }

    editCurso.nomeCurso = curso.nomeCurso;
    editCurso.descricaoCurso = curso.descricaoCurso;
    editCurso.valorCurso = curso.valorCurso;
    editCurso.criadorCurso = curso.criadorCurso;
    editCurso.horasCurso = curso.horasCurso;
    editCurso.imgCurso = curso.imgCurso;
    editCurso.categoriaCurso = curso.categoriaCurso;

    //Salva as alterações
    await this.cursoRepositorio.save(editCurso);

    //Retorna o registro alterado
    return editCurso;
  }

  public async excluir(id: number): Promise<void> {
    await this.cursoRepositorio.delete(id);
  }
}
