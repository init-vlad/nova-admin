package product_repo

import (
	"log/slog"

	"github.com/init-pkg/nova-template/domain/models"
	"github.com/init-pkg/nova-template/domain/modules"

	crud_repo "github.com/init-pkg/nova/modules/crud/repo"
	crud_error_handler "github.com/init-pkg/nova/modules/crud/repo/errors"
	nova_gorm_fields "github.com/init-pkg/nova/shared/gorm/fields"
	"gorm.io/gorm"
)

type ProductRepo struct {
	crud_repo.Repository[models.Product, nova_gorm_fields.UUID]
	db  *gorm.DB
	log *slog.Logger
}

var _ modules.ProductRepo = &ProductRepo{}

func New(db *gorm.DB, log *slog.Logger) *ProductRepo {
	var errHandler = crud_error_handler.NewEasy[nova_gorm_fields.UUID]()

	var repo = crud_repo.New[models.Product](db, errHandler)
	return &ProductRepo{repo, db, log}
}
