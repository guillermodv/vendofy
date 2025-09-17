
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

async function getClient() {
  return await clientPromise;
}

async function getCollection(client) {
  const db = client.db('vendofy'); 
  return db.collection('products');
}

export async function GET() {
  try {
    const client = await getClient();
    const productsCollection = await getCollection(client);
    console.log('productsCollection', productsCollection)
    const products = await productsCollection.find({}).toArray();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const product = await request.json();
    const client = await getClient();
    const productsCollection = await getCollection(client);
    const result = await productsCollection.insertOne(product);
    return NextResponse.json(result.ops[0], { status: 201 });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({ message: 'Error adding product' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, ...productData } = await request.json();
    const client = await getClient();
    const productsCollection = await getCollection(client);
    const result = await productsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: productData }
    );
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ message: 'Error updating product' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const client = await getClient();
    const productsCollection = await getCollection(client);
    const result = await productsCollection.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ message: 'Error deleting product' }, { status: 500 });
  }
}
