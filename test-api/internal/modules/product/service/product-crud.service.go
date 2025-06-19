package product_service

import (
	"context"
	"github.com/init-pkg/nova-template/domain/dtos"

	"github.com/init-pkg/nova/errs"
	crud_repo "github.com/init-pkg/nova/modules/crud/repo"
	nova_gorm_fields "github.com/init-pkg/nova/shared/gorm/fields"
)

func (this *ProductService) GetById(ctx context.Context, id nova_gorm_fields.UUID, opts *crud_repo.GetByIdOptions) (*dtos.ProductResponse, errs.Error) {
	return this.ProductRepo.GetById(ctx, id, opts)
}

func (this *ProductService) Get(ctx context.Context, opts *crud_repo.GetOptions) ([]*dtos.ProductResponse, int64, errs.Error) {
	return this.ProductRepo.Get(ctx, opts)
}

func (this *ProductService) First(ctx context.Context, opts *crud_repo.GetOptions) (*dtos.ProductResponse, errs.Error) {
	return this.ProductRepo.First(ctx, opts)
}

func (this *ProductService) Create(ctx context.Context, dto *dtos.CreateProductRequest, opts *crud_repo.CreateOptions) (*dtos.ProductResponse, errs.Error) {
	return this.ProductRepo.Create(ctx, dto, opts)
}

func (this *ProductService) Update(ctx context.Context, id nova_gorm_fields.UUID, dto *dtos.UpdateProductRequest, opts *crud_repo.UpdateOptions) (*dtos.ProductResponse, errs.Error) {
	return this.ProductRepo.Update(ctx, id, dto, opts)
}
