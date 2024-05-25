const jwt = requrie('jsonwebtoken')

const SECRET_KEY = '1234123ijdioj2ipjd3o2 2pmd23op'

const nossotoken = jwt.sign(
    {
        name: "João"
    },
    SECRET_KEY,
    {
        subject: 1,
        expiresIn: '10s'
    }
)

console.log(nossotoken)