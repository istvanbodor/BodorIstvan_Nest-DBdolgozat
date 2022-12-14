import {
  Body,
  Controller,
  Get,
  Render,
  Post,
  Redirect,
} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import { CatDto } from './cats.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('list')
  async ListCats() {
    const [rows] = await db.execute(
      'SELECT szem_szin, suly FROM macskak ORDER BY suly DESC',
    );

    return { macskak: rows };
  }

  @Post()
  @Render('kereso')
  async ListTalalatok(@Body() macskak: CatDto) {
    const [rows] = await db.execute(
      'SELECT szem_szin, suly FROM macskak WHERE szem_szin =?',
      [macskak.szemszin],
    );

    return {
      macskak: rows
    };

  }

@Get('cats/new')
@Render('insert')
newCatForm() {
  return {};
}

@Post('cats/new')
  @Redirect()
  async newCat(@Body() macskak: CatDto) {
    await db.execute('INSERT INTO macskak (suly, szem_szin) VALUES (?, ?)', 
    [macskak.suly, macskak.szemszin],
  );
  return {
    url: '/',
  };
}



}
