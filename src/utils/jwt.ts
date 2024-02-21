import jwt from 'jsonwebtoken'

export const generateToken = (user_id: string, name: string) => {
  const payload = {
    user_id: user_id,
    name: name
  }
  const secret = process.env.SECRET ?? "";
  const token = jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: '72h' })

  return token
}