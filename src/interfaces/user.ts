export interface Iuser {
  username: string,
  classe: string,
  level: number,
  password: string
}

export interface Alluser extends Iuser {
  id: number,
}