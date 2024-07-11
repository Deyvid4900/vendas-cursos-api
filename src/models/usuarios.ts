import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'clientes' })
export class Usuarios {
    @PrimaryGeneratedColumn()
    idCliente: number;

    @Column()
    nomeCliente: string;

    @Column()
    emailCliente: string;

    @Column()
    senhaCliente: string;

    constructor(idCliente: number, nomeCliente: string, emailCliente: string, senhaCliente: string) {
        this.idCliente = idCliente;
        this.nomeCliente = nomeCliente;
        this.emailCliente = emailCliente;
        this.senhaCliente = senhaCliente;
    }
}
