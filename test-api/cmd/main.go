// @title Nova Template API
// @version 1.0
// @description This is a new clear project from nova template
// @BasePath /
package main

import (
	core "github.com/init-pkg/nova-template/internal/modules/core"
	product_module "github.com/init-pkg/nova-template/internal/modules/product"

	"go.uber.org/fx"
)

func CreateApp() *fx.App {
	var options = fx.Options(
		core.Register(),
		product_module.Register(),
	)

	return fx.New(options)
}

func main() {
	CreateApp().Run()
}
