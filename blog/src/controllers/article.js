import Article from '../models/article'
import { NotFoundError } from '../utils/errors'

class ArticleController {
  async list (req, res) {
    const data = await Article.findPaginate(req.query.page, { limit: 8 })

    res.render('article/list', {
      title: 'Articles',
      user: req.user,
      ...data
    })
  }

  async get (req, res) {
    const { id } = req.params

    const article = await Article.find(+id)

    if (!article) {
      throw new NotFoundError()
    }

    res.render('article/show', {
      title: article.title,
      article,
      user: req.user
    })
  }
}

export default new ArticleController()
