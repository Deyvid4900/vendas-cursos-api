import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Cursos } from './models/cursos';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getStatus(): string {
    return 'Node está rodando: ' + new Date();
  }

  @Get('/cursos')
  listarTodosCursos() {
    console.log('Entrou no método: listarTodosCursos ' + new Date());

    return this.appService.listarTodos();
  }
  @Get('/cursos/10')
  listar10Cursos() {
    console.log('Entrou no método: listarTodosCursos ' + new Date());

    return this.appService.listarTodos10();
  }
  @Get('/cursos/melhores')
  listar10MelhoresCursos() {
    console.log('Entrou no método: listarTodosCursos ' + new Date());

    return this.appService.listar10MelhoresCursos();
  }


  @Get('/curso')
  public buscarPorId(@Query('id') id: number) {
    console.log('Entrou no método: buscarPorId ' + new Date());

    return this.appService.buscarPorId(id);
  }

  @Get('/categoria')
  public buscarPorCategoria(@Query('categoriaCurso') cat:string ) {
    console.log('Entrou no método: buscarPorCategoria ' + new Date());

    return this.appService.buscarCategorias(cat);
  }


  @Get('/categoriaQuantidade')
  public buscarCategoria(@Query('categoriaCurso') cat:string ) {
    console.log('Entrou no método: buscarPorCategoriaQuantidade ' + new Date());

    return this.appService.buscarPorCategoriaQuantidade(cat);
  }

  
  @Get('/categoria5')
  public buscarCincoCategorias() {
    console.log('Entrou no método: buscarPorCategoriaQuantidade ' + new Date());

    return this.appService.buscar5Categorias();
  }


  @Post('/curso')
  public salvar(@Body() curso: Cursos) {
    console.log('Entrou no método: salvar');

    return this.appService.salvar(curso);
  }

  @Put(':id')
  public alterar(@Param('id') id: number, @Body() curso: Cursos) {
    console.log('Entrou no método: alterar ' + new Date());

    return this.appService.atualizar(id, curso);
  }

  @Delete(':id')
  public excluir(@Param('id') id: number) {
    console.log('Entrou no método: delete ' + new Date());

    this.appService.excluir(id);
  }
}
