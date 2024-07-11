import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppServiceUser } from 'src/user-controller/user-controller.service';
import { Usuarios } from 'src/models/usuarios';

@Controller('user-controller')
export class UserControllerController {

  constructor(private readonly appServiceUSer: AppServiceUser) {}

  @Get('/categoria5')
  public buscarCincoCategorias() {
    console.log('Entrou no método: buscarPorCategoriaQuantidade ' + new Date());

    return this.appServiceUSer.buscar5Categorias();
  }

  @Post('/Usuario')
  public salvar(@Body() usuarios: Usuarios) {
    console.log('Entrou no método: salvar');
    console.log(usuarios)

    return this.appServiceUSer.salvar(usuarios);
  }

  @Put(':id')
  public alterar(@Param('id') id: number, @Body() usuarios: Usuarios) {
    console.log('Entrou no método: alterar ' + new Date());

    return this.appServiceUSer.atualizar(id, usuarios);
  }

  @Delete(':id')
  public excluir(@Param('id') id: number) {
    console.log('Entrou no método: delete ' + new Date());

    this.appServiceUSer.excluir(id);
  }
}
