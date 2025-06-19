package product_service

import (
	"github.com/init-pkg/nova-template/domain/modules"
)

type ProductService struct {
	modules.ProductRepo
}

var _ modules.ProductService = &ProductService{}

func New(repo modules.ProductRepo) *ProductService {
	return &ProductService{repo}
}
