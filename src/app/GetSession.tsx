import { getServerSession } from 'next-auth'
import { options } from './api/auth/[...nextauth]/options'

async function GetSession() {
  const session = await getServerSession(options);
  const usertoken=session?.user.result.token
  const useremail=session?.user.result.email


  return [usertoken,useremail]
  
}

export default GetSession