export interface ReviewType{
  reservationNum : string,
  serviceId : number,
  content : string,
  reuse : boolean,
  imageUrlList : any,
  [key : string]: string | number | boolean | string[];
}

// 리뷰 리스트 타입
export interface ReviewListType{
  createdAt:string,
  reservationNum:string,
  reuse:string,
  reviewId:number,
  serviceId:number
}

// 리뷰 상세페이지 타입 1
export interface ReviewDetailType{
  content:string,
  answerContent:string,
  createdAt:string,
  imageUrlList:[],
  reuse:string
}

// 작업자 아이디 가져오기 위한 타입
export interface ReserveDataType{
  serviceItemName:string,
  reservationDate:string,
  workerId:number
}

// 업체명과 작업자 이름 조회 위한 타입
export interface NameDataType{
  serviceName:string,
  workerName:string
}