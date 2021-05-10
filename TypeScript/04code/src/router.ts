import {Router, Request, Response} from 'express'
import Crowller from './crowller'
import ImoocAnalyzer from './imoocAnalyzer'
const router = Router()


router.get('/', (req: Request, res: Response) => {
  res.send(`
    <html>
      <body>
        <form method="post" action="/login">
          <input type="password" name="password />
          <button>提交</button>
        </form>
      </body>
    </html>
  `)
})

router.post('/login', (req: Request, res: Response) => {
  const {password} = req.body
  const isLogin = req.session ? req.session.login : false
  if(isLogin) {
    res.send('已经登录')
  } else {
    if(password === '123' && req.session) {
      req.session.login = true
      res.send('登录成功')
    } else {
      res.send('登录失败')
    }
  }

})

router.post('/getData', (req: Request, res: Response) => {
  const url = 'https://www.imooc.com'
  const analyzer = ImoocAnalyzer.getInstance()
  const crowller = new Crowller(analyzer, url)
  res.send('getData Success!')
})

export default router

