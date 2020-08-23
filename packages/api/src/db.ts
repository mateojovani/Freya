import mongoose from 'mongoose'

const connect = async () => {
  await mongoose.connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

export { connect }
