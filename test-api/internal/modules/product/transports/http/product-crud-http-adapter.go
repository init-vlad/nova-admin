package product_http_handler

import (
	"github.com/init-pkg/nova-template/domain/dtos"
	"github.com/init-pkg/nova-template/domain/modules"

	"github.com/gofiber/fiber/v3"
	"github.com/init-pkg/nova/errs"
	crud_repo "github.com/init-pkg/nova/modules/crud/repo"
	nova_gorm_fields "github.com/init-pkg/nova/shared/gorm/fields"
)

type ProductServiceHttpAdapter struct {
	service modules.ProductService
}

var _ modules.ProductServiceHttpAdapter = &ProductServiceHttpAdapter{}

func NewProductServiceHttpAdapter(service modules.ProductService) *ProductServiceHttpAdapter {
	return &ProductServiceHttpAdapter{service}
}

func (this *ProductServiceHttpAdapter) GetById(fiberCtx fiber.Ctx, id nova_gorm_fields.UUID, opts *crud_repo.GetByIdOptions) (any, errs.Error) {
	var ctx = fiberCtx.Context()

	return this.service.GetById(ctx, id, opts)
}

func (this *ProductServiceHttpAdapter) Get(fiberCtx fiber.Ctx, opts *crud_repo.GetOptions) (any, int64, errs.Error) {
	var ctx = fiberCtx.Context()

	return this.service.Get(ctx, opts)
}

func (this *ProductServiceHttpAdapter) First(fiberCtx fiber.Ctx, opts *crud_repo.GetOptions) (any, errs.Error) {
	var ctx = fiberCtx.Context()

	return this.service.First(ctx, opts)
}

func (this *ProductServiceHttpAdapter) Create(fiberCtx fiber.Ctx, dto *dtos.CreateProductRequest, opts *crud_repo.CreateOptions) (any, errs.Error) {
	var ctx = fiberCtx.Context()

	return this.service.Create(ctx, dto, opts)
}

func (this *ProductServiceHttpAdapter) Update(fiberCtx fiber.Ctx, id nova_gorm_fields.UUID, dto *dtos.UpdateProductRequest, opts *crud_repo.UpdateOptions) (any, errs.Error) {
	var ctx = fiberCtx.Context()

	return this.service.Update(ctx, id, dto, opts)
}

func (this *ProductServiceHttpAdapter) Delete(fiberCtx fiber.Ctx, ids []nova_gorm_fields.UUID, opts *crud_repo.DeleteOptions) errs.Error {
	var ctx = fiberCtx.Context()

	return this.service.Delete(ctx, ids, opts)
}
