'use strict'

const {expect} = require('chai')
const chai = require('chai')
const supertest = require('supertest')
const app = require('../../app')
const mongoose = require('mongoose')

const mongodbUrl = 'mongodb://root:password123@localhost:27017,localhost:27018,localhost:27019/elecTest?replicaSet=replicat&authSource=admin'

describe('POST /elections', () => {

  before(async () => {
    const res = await mongoose.connect(mongodbUrl)
    if (mongoose.connection.readyState !== 1) throw new Error('mongodb connection failed')
  })

  beforeEach(() => {
  })

  after(async () => {
    await mongoose.connection.db.dropDatabase();
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
  })

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
  })
})
