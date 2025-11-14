'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    return { error: 'Incorrect email or password.' }
  }

  const data = await response.json()
  
  // Set cookies from backend response
  const setCookieHeaders = response.headers.getSetCookie()
  const cookieStore = await cookies()
  
  setCookieHeaders.forEach((cookie) => {
    const [nameValue, ...attributes] = cookie.split('; ')
    const [name, value] = nameValue.split('=')
    
    // Parse cookie attributes
    const cookieOptions: any = {
      httpOnly: true,
      secure: true,
      sameSite: 'none' as const,
      path: '/',
    }
    
    attributes.forEach(attr => {
      const [key, val] = attr.split('=')
      if (key.toLowerCase() === 'max-age') {
        cookieOptions.maxAge = parseInt(val)
      } else if (key.toLowerCase() === 'expires') {
        cookieOptions.expires = new Date(val)
      }
    })
    
    cookieStore.set(name, value, cookieOptions)
  })

  // Redirect based on user role
  if (data.user.isAdmin) {
    redirect('/admin')
  } else {
    redirect('/divisi')
  }
}