import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    //Pentru ca lucram in SQL trebuiesc declarate campurile din tabela si tipul lor inainte de folosire

  @PrimaryGeneratedColumn() //Decorator care genereaza automat un id unic pentru fiecare user si il seteaza ca primary key
  id: number; //id-ul este de tip number o sa folosesc alt tip de id in viitor spre exemplu uuid

  @Column({ type: 'varchar', length: 30 }) //Decorator care seteaza coloana username ca varchar cu lungimea maxima de 30 caractere
  username: string; //username-ul este de tip string

  @Column({ type: 'varchar', length: 30 }) //Decorator care seteaza coloana displayname ca varchar cu lungimea maxima de 30 caractere
  displayname: string;  //displayname-ul este de tip string

  @Column({ type: 'int' }) //Decorator care seteaza coloana phone ca int
  phone: number; //phone-ul este de tip number

  @Column({ type: 'varchar', length: 30 }) //Decorator care seteaza coloana email ca varchar cu lungimea maxima de 30 caractere
  email: string; //email-ul este de tip string

  @Column({ type: 'varchar' }) //Decorator care seteaza coloana password ca varchar in care se va stoca hash-ul parolei
  password: string; //password-ul este de tip string

}