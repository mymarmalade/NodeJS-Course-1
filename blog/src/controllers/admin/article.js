import { BadRequestError, NotFoundError } from '../../utils/errors'

const articles = []

class ArticleController {
  list (req, res) {
    res.render('admin/article/list', {
      title: 'Articles list',
      articles
    })
  }

  get (req, res) {
    const { id } = req.params

    const article = articles.find(el => el.id === +id)

    if (!article) {
      throw new NotFoundError('Article not found')
    }

    res.render('admin/article/show', {
      title: article.title,
      article
    })
  }

  create (req, res) {
    res.render('admin/article/create', {
      title: 'Create article'
    })
  }

  add (req, res) {
    const { title, text } = req.body

    if (!title || !text) {
      throw new BadRequestError('title and text are required')
    }

    articles.push({ id: Date.now(), title, text })

    res.redirect('/admin/article')
  }

  edit (req, res) {
    const { id } = req.params

    const article = articles.find(el => el.id === +id)

    if (!article) {
      throw new NotFoundError('Article not found')
    }

    res.render('admin/article/edit', { title: 'Edit article', article })
  }

  update (req, res) {
    const { id } = req.params

    const { title, text } = req.body

    if (!title || !text) {
      throw new BadRequestError('title and text are required')
    }

    const article = articles.find(el => el.id === +id)

    if (!article) {
      throw new NotFoundError('Article not found')
    }

    article.title = title
    article.text = text

    res.redirect('/admin/article')
  }
}

export default new ArticleController()
