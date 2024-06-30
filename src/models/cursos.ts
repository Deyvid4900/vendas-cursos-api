import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'cursos' })
export class Cursos {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nomeCurso: string;

    @Column()
    descricaoCurso: string;

    @Column()
    valorCurso: number;

    @Column()
    criadorCurso: string;

    @Column()
    horasCurso: number;

    @Column()
    imgCurso: string;

    @Column()
    categoriaCurso: string;

    constructor(
        id: number,
        nomeCurso: string,
        descricaoCurso: string,
        valorCurso: number,
        criadorCurso: string,
        horasCurso: number,
        imgCurso: string,
        categoriaCurso: string,
    ) {
        this.id = id;
        this.nomeCurso = nomeCurso;
        this.descricaoCurso = descricaoCurso;
        this.valorCurso = valorCurso;
        this.criadorCurso = criadorCurso;
        this.horasCurso = horasCurso;
        this.imgCurso = imgCurso;
        this.categoriaCurso = categoriaCurso;
    }
}
