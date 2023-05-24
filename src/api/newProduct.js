import connector from './client';

async function createProduct(request) {
  const { data } = await connector.post('/newProduct', request);
  return data;
}

const newProductApi = {
  createProduct,
};

export default newProductApi;
