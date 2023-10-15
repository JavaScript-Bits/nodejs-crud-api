'use strict'

const {expect} = require('chai')
const chai = require('chai')
const supertest = require('supertest')
const app = require('../../app')
const mongoose = require('mongoose')
const {model: electionsSchema} = require('../../models/elections/schema')

const mongodbUrl = 'mongodb://root:password123@localhost:27017,localhost:27018,localhost:27019/elecTest?replicaSet=replicat&authSource=admin'

describe('POST /elections', () => {

  before(async () => {
    await mongoose.connect(mongodbUrl)
    if (mongoose.connection.readyState !== 1) throw new Error('mongodb connection failed')
  })

  beforeEach(async () => {
  })

  afterEach(async () => {
    await electionsSchema.deleteMany({})
  });

  after(async () => {
    // await mongoose.connection.db.dropDatabase();
  });

  it('should return validation error on party field missing', async () => {
    await supertest(app)
      .post('/elections')
      .send({
        candidate: 'some'
      })
      .expect(400)
      .then(res => {
        expect(res.body.details[0].message).to.equal('"party" is required')
      });
  });

  it('should return success on validation pass', async () => {
    await supertest(app)
      .post('/elections')
      .send({
        candidate: 'some',
        party: 'jubilee'
      })
      .expect(200)
      .then(res => {
        const {candidate, votes, party, __v} = res.body.data

        return expect({candidate, votes, party, __v}).to.eql({
          candidate: 'some',
          votes: '0',
          party: 'jubilee',
          __v: 0
        });
      });
  });

  it('should return duplication error on candidate field', async () => {
    await electionsSchema.create({
      candidate: 'some',
      party: 'jubilee',
      votes: 10
    })

    await supertest(app)
      .post('/elections')
      .send({
        candidate: 'some',
        party: 'jubilee',
        votes: 10
      })
      .expect(400)
      .then(res => {
        return expect(res.body).to.eql({
          name: 'DUPLICATE_KEY_ERROR',
          param: 'votes',
          value: '10'
        });
      });
  });
})
