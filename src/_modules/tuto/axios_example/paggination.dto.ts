import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsObject, IsString, isObject } from "class-validator";

export class LoginDto {
    @ApiProperty({ example: "aawali51000" })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ example: "pass1234" })
    @IsString()
    @IsNotEmpty()
    password: string;
};


export class AddressDataDto {
    @ApiProperty({ example: "1Bis" })
    @IsString()
    @IsNotEmpty()
    streetNumber: string;

    @ApiProperty({ example: "Jean Moulin" })
    @IsString()
    @IsNotEmpty()
    streetName: string;

    @ApiProperty({ example: "Paris" })
    @IsString()
    @IsNotEmpty()
    city: string;

    @ApiProperty({ example: "Ile de France" })
    @IsString()
    @IsNotEmpty()
    state: string;

    @ApiProperty({ example: "France" })
    @IsString()
    @IsNotEmpty()
    country: string;
}

export class PersonalDto extends AddressDataDto {
}

export class WorkDto extends AddressDataDto {
}

export class AddressDto {
    @ApiProperty()
    @IsObject()
    @IsNotEmpty()
    personal: PersonalDto;

    @ApiProperty()
    @IsObject()
    @IsNotEmpty()
    work: WorkDto;
}

export class FriendDto {
    @ApiProperty({ example: "Karim" })
    @IsString()
    @IsNotEmpty()
    name: string;
}



export class LargeJsonDto {
    sn: number;

    @ApiProperty({ example: "Wali" })
    @IsString()
    @IsNotEmpty()
    fname: string;

    @ApiProperty({ example: "ABDULLAH" })
    @IsString()
    @IsNotEmpty()
    lname: string;

    @ApiProperty({ example: "Male" })
    @IsString()
    @IsNotEmpty()
    gender: string;

    @ApiProperty({ example: "W3Soft" })
    @IsString()
    @IsNotEmpty()
    company: string;

    @ApiProperty({ example: "info@wali.co" })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsObject()
    @IsNotEmpty()
    login: LoginDto;

    @ApiProperty({ example: "+33 7 26 54 25 25" })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({ example: "http://imgs.com/wali" })
    @IsString()
    @IsNotEmpty()
    photo: string;

    @ApiProperty()
    @IsObject()
    @IsNotEmpty()
    address: AddressDto;

    @ApiProperty({ example: "Hi, Welcome to DesiSoft" })
    @IsString()
    @IsNotEmpty()
    greeting: string;

    @ApiProperty({ example: ["Karim", "James", "Alex"] })
    @IsArray()
    @IsNotEmpty()
    friends: FriendDto[];
}


export class CreateLargeJsonDto {
    @ApiProperty()
    @IsObject()
    @IsNotEmpty()
    document: LargeJsonDto;
}


export class Page_LimitDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    page: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    limit: number;
}


export class CheckBoxDto {
    @ApiProperty({ description: 'Example checkbox', default: false })
    exampleCheckbox: boolean;
}


export enum MyOptions {
    Option1 = 'Option1',
    Option2 = 'Option2',
    Option3 = 'Option3',
}

export class MyDto {
    @ApiProperty({ enum: MyOptions, enumName: 'MyOptions' })
    option: MyOptions;
}
