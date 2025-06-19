package modules

import (
	"context"
	"github.com/init-pkg/nova-template/domain/dtos"
	"github.com/init-pkg/nova-template/domain/models"

	"github.com/init-pkg/nova/errs"
	crud_handler "github.com/init-pkg/nova/modules/crud/handler"
	crud_repo "github.com/init-pkg/nova/modules/crud/repo"
	nova_gorm_fields "github.com/init-pkg/nova/shared/gorm/fields"
)

// ========================= Product =========================
type ProductRepo interface {
	crud_repo.Repository[models.Product, nova_gorm_fields.UUID]
}

type ProductService interface {
	GetById(ctx context.Context, id nova_gorm_fields.UUID, opts *crud_repo.GetByIdOptions) (*dtos.ProductResponse, errs.Error)
	Get(ctx context.Context, opts *crud_repo.GetOptions) ([]*dtos.ProductResponse, int64, errs.Error)
	First(ctx context.Context, opts *crud_repo.GetOptions) (*dtos.ProductResponse, errs.Error)
	Create(ctx context.Context, dto *dtos.CreateProductRequest, opts *crud_repo.CreateOptions) (*dtos.ProductResponse, errs.Error)
	Update(ctx context.Context, id nova_gorm_fields.UUID, dto *dtos.UpdateProductRequest, opts *crud_repo.UpdateOptions) (*dtos.ProductResponse, errs.Error)
	Delete(ctx context.Context, ids []nova_gorm_fields.UUID, opts *crud_repo.DeleteOptions) errs.Error
}

type ProductServiceHttpAdapter interface {
	crud_handler.UntypedCrud[dtos.CreateProductRequest, dtos.UpdateProductRequest, nova_gorm_fields.UUID]
}
