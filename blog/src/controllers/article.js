import Article from '../models/article'
import { NotFoundError } from '../utils/errors'

const PAGE_SIZE = 3

class ArticleController {
  async list (req, res) {
    const { page = 1 } = req.query

    const { count: totals, rows: articles } = await Article.findAndCountAll({
      include: ['user'],
      order: [['id', 'DESC']],
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE
    })

    res.render('article/list', {
      title: 'Articles',
      articles,
      user: req.user,
      totals,
      pages: Math.ceil(totals / PAGE_SIZE),
      page: +page
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
