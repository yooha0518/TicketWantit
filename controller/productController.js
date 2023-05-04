const { productService } = require('../services');
const asyncHandler = require('../utils/async-handler');
const Domain = 'http://34.64.112.166/';

//메인 페이지 상품 매핑
function productMapping(items) {
  const content = items.map(
    ({ productName, price, startDate, endDate, imageUrl, productId }) => ({
      productName,
      price,
      startDate,
      endDate,
      imageUrl,
      productId,
    })
  );
  return content;
}

const productController = {
  //상품 전체
  getProduct: asyncHandler(async (req, res) => {
    const products = await productService.readProduct();
    const content = productMapping(products);
    res.status(200).json(content);
  }),
  //상품 검색 API
  getSearch: asyncHandler(async (req, res) => {
    const { keyword } = req.query;
    const result = await productService.searchProduct(keyword);
    if (result.error) {
      const {
        error: { message, status },
      } = result;
      res.status(status).json({ message });
    }
    res.status(200).json(result.searchProduct);
  }),
  //상품 카테고리별
  getCategoryProduct: asyncHandler(async (req, res) => {
    const { category } = req.query;
    const result = await productService.readCategoryProduct(category);
    if (result.error) {
      const {
        error: { message, status },
      } = result;
      res.status(status).json({ message });
    }
    const content = productMapping(result.products);
    res.status(200).json(content);
  }),
  //상품 상세
  getDetail: asyncHandler(async (req, res) => {
    const { productId } = req.query;
    const result = await productService.readDetail(productId);
    if (result.error) {
      const {
        error: { message, status },
      } = result;
      res.status(status).json({ message });
    }

    res.status(200).json(result.products);
  }),
  //NEW_ARRIVAlS
  getNewArrivals: asyncHandler(async (req, res) => {
    const products = await productService.readNewArrivals();
    const content = productMapping(products);
    res.status(200).json(content);
  }),
  //MD
  getMDPick: asyncHandler(async (req, res) => {
    const products = await productService.readMDPick();
    const content = productMapping(products);
    res.status(200).json(content);
  }),
  //----------------------------------------- ADMIN----------------------------
  //ADMIN 상품 전체
  getAdminProduct: asyncHandler(async (req, res) => {
    const products = await productService.adminReadProduct();
    const content = products.map(
      ({
        category,
        productId,
        productName,
        imageUrl,
        price,
        place,
        speciesAge,
        description,
        startDate,
        endDate,
      }) => ({
        category,
        productId,
        productName,
        imageUrl,
        price,
        place,
        speciesAge,
        description,
        startDate,
        endDate,
      })
    );
    res.status(200).json(content);
  }),
  //ADMIN 상품 추가
  postProduct: asyncHandler(async (req, res) => {
    const imageUrl = Domain + req.file.path;
    const {
      category,
      productName,
      price,
      startDate,
      endDate,
      place,
      speciesAge,
      description,
    } = req.body;

    if (
      !category ||
      !productName ||
      !price ||
      !speciesAge ||
      !startDate ||
      !endDate ||
      !place ||
      !description
    ) {
      return res.status(400).json({
        message: '필수 입력값이 누락되었습니다. 값을 전부 입력해주세요.',
      });
    }
    const products = await productService.createProduct({
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
    res.status(200).json(products);
  }),

  //ADMIN 상품 삭제
  delProduct: asyncHandler(async (req, res) => {
    const { productId } = req.query;
    const content = await productService.deleteProduct(productId);
    res.status(200).json(content);
  }),
  //ADMIN 상품 전체 삭제
  delAllProduct: asyncHandler(async (req, res) => {
    const content = await productService.deleteAllProduct();
    res.status(200).json(content);
  }),
  //ADMIN 상품 수정 추가 API
  reviseProduct: asyncHandler(async (req, res) => {
    const { productId } = req.query;
    const imageUrl = Domain + req.file.path;
    const {
      category,
      productName,
      price,
      startDate,
      endDate,
      place,
      speciesAge,
      description,
    } = req.body;
    const content = await productService.updateReviseProduct(
      productId,
      category,
      productName,
      price,
      startDate,
      endDate,
      place,
      speciesAge,
      description,
      imageUrl
    );
    res.status(200).json(content);
  }),
  //ADMIN 상품 수정
  putProduct: asyncHandler(async (req, res) => {
    const { productId } = req.query;
    const {
      category,
      productName,
      price,
      startDate,
      endDate,
      place,
      speciesAge,
      description,
    } = req.body;

    const content = await productService.updateProduct(
      productId,
      category,
      productName,
      price,
      startDate,
      endDate,
      place,
      speciesAge,
      description
    );
    res.status(200).json(content);
  }),
  //ADMIN 상품 이미지 수정
  putImg: asyncHandler(async (req, res) => {
    const { productId } = req.query;
    const imageUrl = Domain + req.file.path;
    const content = await productService.updateImg(productId, imageUrl);
    res.status(200).json(content);
  }),
};

module.exports = productController;
