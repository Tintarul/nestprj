import {IsEmail, IsPhoneNumber, IsNotEmpty, IsString, Matches, MinLength, IsInt} from 'class-validator';
  
  const regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/; // Cu regex asta verificam daca parola contine minim 8 caractere, maxim 20, cel putin o litera mare, o litera mica, un numar si un caracter special
  
  export class CreateUserDto {
    @IsString() //Decorator care verifica daca numele este de tip string
    @MinLength(4, { message: 'Name must have atleast 4 characters.' }) //Decorator care verifica daca numele are minim 2 caractere
    @IsNotEmpty() //Decorator care verifica daca numele nu este gol
    username: string;
  
    @IsString() //Decorator care verifica daca display name este de tip string
    @MinLength(4, { message: 'Name must have atleast 4 characters.' }) //Decorator care verifica daca display name are minim 2 caractere
    @IsNotEmpty() //Decorator care verifica daca display name nu este gol
    displayname: string;
  
    @IsNotEmpty() //Decorator care verifica daca email-ul nu este gol
    @IsEmail(null, { message: 'Please provide valid Email.' }) //Decorator care verifica daca email-ul este valid
    email: string;
  
    @IsInt() //Decorator care verifica daca numarul de telefon este de tip int
    @IsNotEmpty() //Decorator care verifica daca numarul de telefon nu este gol
    @IsPhoneNumber(null, { message: 'Please provide valid Phone Number.' }) //Decorator care verifica daca numarul de telefon este valid
    phone: number;
  
    @IsNotEmpty() //Decorator care verifica daca parola nu este goala
    @Matches(regEx, {
      message: `Password must contain Minimum 8 and maximum 20 characters, 
      at least one uppercase letter, 
      one lowercase letter, 
      one number and 
      one special character`,
    }) //Decorator care verifica daca parola este valida folosind regex-ul de mai sus
    password: string; 
  }