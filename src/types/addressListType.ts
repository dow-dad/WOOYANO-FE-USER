export interface Address {
  id: number;
  localAddress: string;
  extraAddress: string;
  defaultAddress: boolean;
}

export interface AddressLsitType {
  addressList: Address[];
}

export interface AddressEditGetType {
  id: number;
  localAddress: string;
  extraAddress: string;
}

