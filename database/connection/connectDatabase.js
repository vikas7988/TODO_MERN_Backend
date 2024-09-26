import { connect } from "mongoose";
// import { mongoURI } from "../../config/config";

async function connectDatabase() {
  const result = await connect(`mongodb://127.0.0.1:27017/todotask`);
  return result;
}

export default connectDatabase;
