import prisma from '../utils/prisma'

export default async function addProduct(formData){
    const name = formData.get('name')
    const sku = formData.get('sku')
    const price = formdata.get('price')
    const description = formData.get('description')
    const totalStock = formData.get('totalStock')
    const category =formData.get('category')
    const color = formData.get('color')
    const totalSelled = formData.get('totalSelled')

    try{
        await prisma.product.create({
            data:{
                name,
                sku,
                price,
                description,
                totalStock,
                category,
                color,
                totalSelled
            }})
                return res.status(201).json({message:"Product added successfully"})
    }catch(e){
        console.error(e);
    }
}