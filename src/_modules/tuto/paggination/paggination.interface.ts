export interface ILargeJson {
    sn: string;
    fname: string;
    lname: string;
    gender: string;
    company: string;
    email: string;
    login: ILogin;
    phone: string;
    photo: string;
    address: IAddress;
    greeting: string;
    friends: IFriend[];
}

export interface IAddress {
    personal: IPersonal;
    work: IPersonal;
}

export interface IPersonal {
    streetNo: IStreetNo;
    streetName: string;
    city: string;
    state: string;
    country: string;
}

export interface IStreetNo {
    $numberInt: string;
}

export interface IFriend {
    name: string;
}

export interface ILogin {
    username: string;
    password: string;
}