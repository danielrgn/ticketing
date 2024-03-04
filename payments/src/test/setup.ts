import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  var signin: (id?: string) => string[];
}

jest.mock('../nats-wrapper');

process.env.STRIPE_KEY =
  'sk_test_51OqM3CJClK0GhRuPDXdncE5oBHLARwPKoI7On0pPSxIQHLV23X8hUpn8qMGN4vdm8KXtxQGPE102TnZDLVfdXxWH00HTSK8Aif';

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = 'teste';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'dasdsa@dasdas.combr',
  };

  const token = jwt.sign(payload, process.env.JWT_KEY!);
  const sessionJSON = JSON.stringify({ jwt: token });
  const base64 = Buffer.from(sessionJSON).toString('base64');

  return [`session=${base64}`];
};
