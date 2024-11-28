
import { jwtVerify, SignJWT } from "jose"
import { redirect } from 'next/navigation'
import { cookies } from "next/headers"

export const cookie = {
    name: 'session',
    options: {httpOnly: true, secure: true, sameSite: 'lax', path: '/'},
    duration: 24 * 60 * 1000
}

const key = new TextEncoder().encode(process.env.SECRET)

export async function encrypt(payload) {
    return new SignJWT(payload)
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime('1day')
    .sign(key)
}

export async function decrypt(session) {
    try{
        const {payload} = await jwtVerify(session, key, {
            algorithms: ['HS256']
        })

        return payload;
    }catch(err){
        return null;
    }
}

export async function createSession(userId) {
    const expires = new Date(Date.now() + cookie.duration)
    const session = await encrypt({userId, role: 'admin', expires})

    cookies().set(cookie.name, session, {...cookie.options, expires})
}

export async function verifySession() {
    const mCookies = cookies().get(cookie.name)?.value;
    if(mCookies){
        const session = await decrypt(mCookies);
        if(session){
            if(session.role === 'admin'){
                return {userId: session.userId};
            }else {
                return null;
            }
            
        }else {
            return null;
        }
        
    }

    return null;
}

export async function deleteSession(){
    cookies().delete(cookie.name);
    redirect('/login');
}