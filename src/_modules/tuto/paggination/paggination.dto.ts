export class LoginDto {
    username: string;
    password: string;
};


export class StreetNoDto {
    $numberInt: string;
}

export class PersonalDto {
    streetName: StreetNoDto;
    city: string;
    state: string;
    country: string;
}
export class WorkDto {
    streetNo: string;
    streetName: string;
    city: string;
    state: string;
    country: string;
}
export class AddressDto {
    personal: PersonalDto;
    work: WorkDto;
}

export class FriendDto {
    name: string;
}

export class LargeJsonDto {
    sn: string;
    fname: string;
    lname: string;
    gender: string;
    company: string;
    email: string;
    login: LoginDto
    phone: string;
    photo: string;
    address: AddressDto;
    greeting: string;
    friends: FriendDto[]
}