const { productService } = require('../services');
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
  async getProduct(req, res, next) {
    try {
      const products = await productService.readProduct();
      const content = productMapping(products);
      res.status(200).json(content);
    } catch (err) {
      next(err);
    }
  },
  //상품 카테고리별
  async getCategoryProduct(req, res, next) {
    try {
      const { category } = req.query;
      const products = await productService.readCategoryProduct(category);
      const content = productMapping(products);
      res.status(200).json(content);
    } catch (err) {
      next(err);
    }
  },
  //상품 상세
  async getDetail(req, res, next) {
    try {
      const { productId } = req.query;
      const content = await productService.readDetail(productId);
      res.status(200).json(content);
    } catch (err) {
      next(err);
    }
  },
  //NEW_ARRIVAlS
  async getNewArrivals(req, res, next) {
    try {
      const products = await productService.readNewArrivals();
      const content = productMapping(products);
      res.status(200).json(content);
    } catch (err) {
      next(err);
    }
  },
  //MD
  async getMDPick(req, res, next) {
    try {
      const products = await productService.readMDPick();
      const content = productMapping(products);
      res.status(200).json(content);
    } catch (err) {
      next(err);
    }
  },
  //----------------------------------------- ADMIN----------------------------
  //ADMIN 상품 전체
  async getAdminProduct(req, res, next) {
    try {
      const products = await productService.readProduct();
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
    } catch (err) {
      next(err);
    }
  },
  //ADMIN 상품 추가
  async postProduct(req, res, next) {
    try {
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
    } catch (err) {
      next(err);
    }
  },
  //ADMIN 상품 삭제
  async delProduct(req, res, next) {
    try {
      const { productId } = req.query;
      const content = await productService.deleteProduct(productId);
      res.status(200).json(content);
    } catch (err) {
      next(err);
    }
  },
  //ADMIN 상품 전체 삭제
  async delAllProduct(req, res, next) {
    try {
      const content = await productService.deleteAllProduct();
      res.status(200).json(content);
    } catch (err) {
      next(err);
    }
  },
  //ADMIN 상품 수정
  async putProduct(req, res, next) {
    try {
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
    } catch (err) {
      next(err);
    }
  },
  //ADMIN 상품 수정
  async putImg(req, res, next) {
    try {
      const { productId } = req.query;
      const imageUrl = Domain + req.file.path;
      const content = await productService.updateImg(productId, imageUrl);
      res.status(200).json(content);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = productController;
