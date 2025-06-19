package product_http_handler

import (
	"github.com/init-pkg/nova-template/domain/dtos"
	"github.com/init-pkg/nova-template/domain/modules"

	"github.com/gofiber/fiber/v3"
	crud_handler "github.com/init-pkg/nova/modules/crud/handler"
	nova_gorm_fields "github.com/init-pkg/nova/shared/gorm/fields"
)

type ProductHttpHandler struct {
	crudHandler *crud_handler.Handler[dtos.CreateProductRequest, dtos.UpdateProductRequest, nova_gorm_fields.UUID]
	service     modules.ProductService
}

func New(service modules.ProductService, adapter modules.ProductServiceHttpAdapter) *ProductHttpHandler {
	var crudHandler = crud_handler.New(adapter)
	return &ProductHttpHandler{crudHandler, service}
}

func (this *ProductHttpHandler) Register(mainApp *fiber.App) {
	var app = mainApp.Group("/products")
	app.Use("/", this.crudHandler.Routes())
}
