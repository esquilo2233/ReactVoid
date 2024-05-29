// server.js
require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Rotas para Product
fastify.get('/products', async (request, reply) => {
  try {
    console.log('Fetching products...');
    const products = await prisma.product.findMany();
    console.log('Products fetched:', products);
    reply.send(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    fastify.log.error(error);
    reply.status(500).send({ error: 'An error occurred while fetching products.', details: error.message });
  }
});

fastify.post('/products', async (request, reply) => {
  try {
    const { name, sku, price, color, category, totalStock, totalSelled, description, userId } = request.body;
    console.log('Creating product:', { name, sku, price, color, category, totalStock, totalSelled, description, userId });
    const newProduct = await prisma.product.create({
      data: { name, sku, price, color, category, totalStock, totalSelled, description, userId },
    });
    console.log('Product created:', newProduct);
    reply.status(201).send(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    fastify.log.error(error);
    reply.status(500).send({ error: 'An error occurred while creating the product.', details: error.message });
  }
});

fastify.put('/products/:id', async (request, reply) => {
  try {
    const { id } = request.params;
    const { name, sku, price, color, category, totalStock, totalSelled, description, userId } = request.body;
    console.log('Updating product:', { id, name, sku, price, color, category, totalStock, totalSelled, description, userId });
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id, 10) },
      data: { name, sku, price, color, category, totalStock, totalSelled, description, userId },
    });
    console.log('Product updated:', updatedProduct);
    reply.send(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    fastify.log.error(error);
    reply.status(500).send({ error: 'An error occurred while updating the product.', details: error.message });
  }
});

fastify.delete('/products/:id', async (request, reply) => {
  try {
    const { id } = request.params;
    console.log('Deleting product:', id);
    await prisma.product.delete({
      where: { id: parseInt(id, 10) },
    });
    console.log('Product deleted:', id);
    reply.send({ message: 'Product deleted' });
  } catch (error) {
    console.error('Error deleting product:', error);
    fastify.log.error(error);
    reply.status(500).send({ error: 'An error occurred while deleting the product.', details: error.message });
  }
});

// Iniciar o servidor
const start = async () => {
  try {
    await fastify.listen({ port: 4000 });
    fastify.log.info(`Servidor rodando em http://localhost:4000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
