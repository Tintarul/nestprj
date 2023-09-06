import {IsNotEmpty, IsString, Matches, MinLength} from 'class-validator';
  
  const regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/; // Cu regex asta verificam daca parola contine minim 8 caractere, maxim 20, cel putin o litera mare, o litera mica, un numar si un caracter special
  
  export class LoginUserDto {
    @IsString() //Decorator care verifica daca numele este de tip string
    @MinLength(4, { message: 'Name must have atleast 4 characters.' }) //Decorator care verifica daca numele are minim 2 caractere
    @IsNotEmpty() //Decorator care verifica daca numele nu este gol
    username: string;
  
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