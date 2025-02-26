import bcrypt



def hashPw(password: str) -> str:
  salt= bcrypt.gensalt()
  pwHasheada = bcrypt.hashpw(password.encode('utf-8'), salt)
  return pwHasheada.decode('utf-8')

def verificarPw(password: str, hash: str):
  return bcrypt.checkpw(password.encode('utf-8'), hash.encode('utf-8'))