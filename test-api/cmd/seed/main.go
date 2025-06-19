package main

import (
	"log"

	"github.com/init-pkg/nova-template/domain/models"
	"github.com/init-pkg/nova-template/internal/config"

	nova_config_loader "github.com/init-pkg/nova/tools/config-loader"
	nova_db_initializer "github.com/init-pkg/nova/tools/db-initializer"
	nova_seeder "github.com/init-pkg/nova/tools/seed"
)

func main() {
	var (
		cfg = nova_config_loader.MustLoad[config.Config]()
		db  = nova_db_initializer.MustInit(&cfg.Infrastructure.Db)
	)

	var err = nova_seeder.EasySeed[[]models.Product](db, "./resources", "seed", "products.json")
	if err != nil {
		log.Fatal(err)
	}
}
