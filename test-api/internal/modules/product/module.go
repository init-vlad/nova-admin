package product_module

import (
	"github.com/init-pkg/nova-template/domain/modules"
	product_repo "github.com/init-pkg/nova-template/internal/modules/product/repo"
	product_service "github.com/init-pkg/nova-template/internal/modules/product/service"
	product_http_handler "github.com/init-pkg/nova-template/internal/modules/product/transports/http"

	"github.com/gofiber/fiber/v3"
	"go.uber.org/fx"
)

func Register() fx.Option {
	return fx.Options(
		fx.Provide(
			// repos
			fx.Annotate(product_repo.New, fx.As(new(modules.ProductRepo))),

			// services
			fx.Annotate(product_service.New, fx.As(new(modules.ProductService))),

			// handlers
			fx.Annotate(product_http_handler.NewProductServiceHttpAdapter, fx.As(new(modules.ProductServiceHttpAdapter))),
			product_http_handler.New,
		),

		fx.Invoke(
			func(handler *product_http_handler.ProductHttpHandler, app *fiber.App) {
				handler.Register(app)
			},
		),
	)
}
