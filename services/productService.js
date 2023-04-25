const { Product } = require('../models');

const productService = {
  //상품 목록 확인
  async readProduct() {
    const products = await Product.find({});
    return products;
  },
  // 상품 카테고리별
  async readCategoryProduct(categoryName) {
    const products = await Product.find({ category: categoryName });
    return products;
  },
  //상품 상세
  async readDetail(id) {
    const product = await Product.findOne({ productId: id });
    return product;
  },
  //NEW_ARRIVAlS
  async readNewArrivals() {
    const products = await Product.find().sort({ startDate: -1 }).limit(6);
    return products;
  },
  //MD추천
  async readMDPick() {
    const products = await Product.aggregate([{ $sample: { size: 6 } }]);
    return products;
  },

  //------------------------------------ADMIN------------------------------
  //ADMIN 상품 전체
  //상품 추가
  async createProduct({
    category,
    productName,
    price,
    startDate,
    endDate,
    place,
    speciesAge,
    imageUrl,
    description,
  }) {
    const products = await Product.create({
      category,
      productName,
      price,
      startDate,
      endDate,
      place,
      speciesAge,
      imageUrl,
      description,
    });
    return products;
  },
  //상품 삭제
  async deleteProduct(id) {
    await Product.deleteOne({ productId: id });

    return `productId: [${id}] DELETE SUCCESS!`;
  },
  //상품 전체 삭제
  async deleteAllProduct() {
    await Product.deleteMany({});
    return 'COMPLETE DELECTION OF ALL!';
  },
  async updateProduct(
    id,
    category,
    productName,
    price,
    startDate,
    endDate,
    place,
    speciesAge,
    description,
    imageUrl
  ) {
    const updateData = {
      category,
      productName,
      price,
      startDate,
      endDate,
      place,
      speciesAge,
      description,
      imageUrl,
    };
    await Product.updateOne({ productId: id }, { $set: updateData });
    return `productId: [${id}] UPDATE SUCCESS!`;
  },
  //상품 수정
};
module.exports = productService;
