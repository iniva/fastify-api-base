import 'mocha'
import { expect } from 'chai'
import { faker } from '@faker-js/faker'
import { v4 as uuid } from 'uuid'

import api from './helpers/api'

describe('Posts', () => {
  it('should return an empty list when there are no posts', async () => {
    const response = await api.get('/posts')

    expect(response.data.length).to.be.equal(0)
  })

  it('should fail with HTTP 400 when creating a post with invalid data', async () => {
    try {
      await api.post('/posts', {})
    } catch (error: any) {
      expect(error.response.status).to.be.equal(400)
    }
  })

  it('should create a post when receiving valid data', async () => {
    const postData = {
      title: faker.lorem.words(3),
      content: faker.lorem.paragraph(2),
      author: `${faker.name.firstName()} ${faker.name.lastName()}`,
    }

    const response = await api.post('/posts', postData)

    expect(response.status).to.be.equal(200)
  })

  it('should fail with HTTP 400 when updating a post with invalid data', async () => {
    const postData = {
      title: faker.lorem.words(3),
      content: faker.lorem.paragraph(2),
      author: `${faker.name.firstName()} ${faker.name.lastName()}`,
    }

    const response = await api.post('/posts', postData)
    const postId = response.data.id

    try {
      await api.put(`/posts/${postId}`, {})
    } catch (error: any) {
      expect(error.response.status).to.be.equal(400)
    }
  })

  it('should update a post when receiving valid data', async () => {
    const postData = {
      title: faker.lorem.words(3),
      content: faker.lorem.paragraph(2),
      author: `${faker.name.firstName()} ${faker.name.lastName()}`,
    }

    const response = await api.post('/posts', postData)
    const postId = response.data.id

    const updateResponse = await api.put(`/posts/${postId}`, { content: faker.lorem.paragraph(2) })

    expect(updateResponse.status).to.be.equal(200)
    expect(updateResponse.data.content).to.not.be.equal(postData.content)
  })

  it('should return a list with posts', async () => {
    const response = await api.get('/posts')

    expect(response.data.length).to.be.greaterThan(0)
  })

  it('should fail with HTTP 404 when post does not exist', async () => {
    try {
      const postId = uuid()
      await api.get(`/posts/${postId}`)
    } catch (error: any) {
      expect(error.response.status).to.be.equal(404)
    }
  })

  it('should return post details', async () => {
    const postData = {
      title: faker.lorem.words(3),
      content: faker.lorem.paragraph(2),
      author: `${faker.name.firstName()} ${faker.name.lastName()}`,
    }

    const createResponse = await api.post('/posts', postData)
    const postId = createResponse.data.id
    const response = await api.get(`/posts/${postId}`)
    const post = response.data

    expect(post.title).to.be.equal(postData.title)
    expect(post.author).to.be.equal(postData.author)
  })

  it('should delete a post', async () => {
    const postData = {
      title: faker.lorem.words(3),
      content: faker.lorem.paragraph(2),
      author: `${faker.name.firstName()} ${faker.name.lastName()}`,
    }

    const createResponse = await api.post('/posts', postData)
    const postId = createResponse.data.id
    const detailsResponse = await api.get(`/posts/${postId}`)

    expect(detailsResponse.status).to.be.equal(200)

    const deleteResponse = await api.delete(`/posts/${postId}`)

    expect(deleteResponse.status).to.be.equal(204)

    try {
      await api.get(`/posts/${postId}`)
    } catch (error: any) {
      expect(error.response.status).to.be.equal(404)
    }
  })

  context('Filtering', () => {
    before(async () => {
      const posts = [...Array(10).keys()]

      for (const _post of posts) {
        const postData = {
          title: faker.lorem.words(3),
          content: faker.lorem.paragraph(2),
          author: `${faker.name.firstName()} ${faker.name.lastName()}`
        }

        await api.post('/posts', postData)
      }
    })

    it('should return a list of published posts', async () => {
      const response = await api.get('/posts')
      const postId = response.data[0].id

      await api.put(`/posts/${postId}`, { published: true })

      const filter = { params: { published: 'true' } }
      const listResponse = await api.get('/posts', filter)
      const posts = listResponse.data

      posts.forEach(post => {
        expect(post.published).to.be.true
      })
    })

    it('should return a list of non-published posts', async () => {
      const filter = { params: { published: 'false' } }
      const listResponse = await api.get('/posts', filter)
      const posts = listResponse.data

      posts.forEach(post => {
        expect(post.published).to.be.false
      })
    })

    it('should return posts with matching title', async () => {
      const response = await api.get('/posts')
      const postTitle = response.data[0].title

      const filter = { params: { title: postTitle } }
      const listResponse = await api.get('/posts', filter)
      const posts = listResponse.data

      posts.forEach(post => {
        expect(post.title).to.be.equal(postTitle)
      })
    })

    it('should return posts with matching author', async () => {
      const response = await api.get('/posts')
      const postAuthor = response.data[0].author

      const filter = { params: { author: postAuthor } }
      const listResponse = await api.get('/posts', filter)
      const posts = listResponse.data

      posts.forEach(post => {
        expect(post.author).to.be.equal(postAuthor)
      })
    })
  })
})
