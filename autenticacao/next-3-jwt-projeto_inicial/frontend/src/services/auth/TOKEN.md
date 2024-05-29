# Sobre token

## Access Token:
- **Pra que serve?**
    - Pegar qualquer informação do usuário
    - Atualizar qualquer informação do usuário
    - Inserir qualquer informação do usuário
    - Deletar qualquer informação do usuário
- **Duração**
    - Dura pouco tempo/O mínimo possível
- **Risco se ele vazar**
    - Quanto maior o tempo de vida do token, maior o estrago quem tiver o token pode fazer

## Refresh Token
- **Pra que serve?**
    - Literalmente, para não precisar pedir a senha e o usuário para gerar um novo access_token
- **Duração**
    - Duração dele é longa
    - O refresh token a nível de servidor tá associado de alguma forma
- **Risco se ele vazar**
    - Se ele vazar, o usuário novo pode gerar tokens IFINITOS (access_token, refresh_token)
    - Precisa ter alguma forma de invalidar os refresh_token
